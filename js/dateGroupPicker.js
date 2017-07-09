/**
 * Created by yunxi on 2017/7/9.
 */
/**
 * Created by caipf on 2017/7/5.
 */
(function($){
    function dateGroupPicker() {

       this.markClass="mark";
       this.iDate=new Date();
       this.year=this.iDate.getFullYear();
       this.month=this.iDate.getMonth();
       this.day=this.iDate.getDate();
       this.dategroup=[];
       this.defaults={
           pickernum:2,
           monthNames: [ "1月","2月","3月","4月","5月","6月","7月","8月","9月","10月","11月","12月" ],
           onSelect:function () {
               
           }
       };
       

    };
    dateGroupPicker.prototype= {

        _initHtml:function (target,settings) {

            $(target).append(`<div class="toLeft">&laquo;</div>
                              <div class="childpicker"></div>
                              <div class="toRight">&raquo;</div>
                              <div>
                                <textarea class="date_area" readonly="readonly"></textarea>
                              </div>`);
            //this._initPickerHtml(target,this.settings);
            return this;
        },

        _initPickerHtml:function (target,settings) {
            let parent_em=$(target).find(".childpicker");
            parent_em.html("");

            let childpickerhtml="";
            for(var i=0;i<settings.pickernum;i++){
                childpickerhtml+=`<div class='datepicker${i}'></div>`;
            }
            parent_em.append(childpickerhtml);

            //this._initGroupDate(target,settings);
            return this;
        },
        _getTargetDateInfo:function (target) {
           return this.dategroup.filter(function (item) {
                return item.id==target.id;
            })[0];
        },

        _initGroupDate:function (target,settings) {
            let grouppicker=$(target).find(".childpicker div")

            let year=this.year,
                month=this.month,
                day=this.day;

            for(var i=0;i<grouppicker.length;i++){
                $.extend(settings,this.defaults);
                settings.defaultDate=new Date(year,month,day);

                $.fn.datepicker.call($(grouppicker[i]),settings);
                month++;
            }
            return this;
            //this._EventBind(target,settings);
        },

        _EventBind:function(target,settings) {

            let _this=this,
                pickernum=settings.pickernum;

            $(target).on("click",".toLeft,.toRight",function (e) {


                if(e.target.className=="toLeft"){

                    _this.month=_this.month-pickernum;
                    if(_this.month<0){
                        _this.year=_this.year-1;
                        _this.month=_this.month+12;
                    }

                }else if(e.target.className=="toRight"){

                    _this.month=_this.month+pickernum;
                    if(_this.month>11){
                        _this.year=_this.year+1;
                        _this.month=_this.month-12;
                    }

                }
                _this._initPickerHtml(target,settings);
                _this._initGroupDate(target,settings);

            });
        }

    };


    $.dateGroupPicker=new dateGroupPicker();


    $.fn.dateGroupPicker=function (options) {

        return this.each(function () {

            let dgp=new dateGroupPicker();
            dgp._initHtml(this,options);
            dgp._initPickerHtml(this,options);
            dgp._initGroupDate(this,options);
            dgp._EventBind(this,options);

        });


    };


    // $.fn.dateGroupPicker=function (options) {
    //     let methods={
    //         initHtml:function () {
    //             this.append(`<div class="toLeft">&laquo;</div>
    //                          <div class="childpicker"></div>
    //                          <div class="toRight">&raquo;</div>
    //                          <div>
    //                             <textarea class="date_area" readonly="readonly"></textarea>
    //                          </div>`);
    //         },
    //         initPickerHtml:function (options) {
    //             let parent_em=this.find(".childpicker");
    //             parent_em.html("");
    //
    //             let childpickerhtml="";
    //             for(var i=0;i<options.pickernum;i++){
    //                 childpickerhtml+=`<div class='datepicker${i}'></div>`;
    //             }
    //             parent_em.append(childpickerhtml);
    //
    //         },
    //
    //         initGroupDate:function (idate) {
    //             let grouppicker=this.find(".childpicker div");
    //
    //             let date=idate,
    //                 year=date.getFullYear(),
    //                 month=date.getMonth(),
    //                 day=date.getDate();
    //
    //             for(var i=0;i<grouppicker.length;i++){
    //                 options.defaultDate=new Date(year,month,day);
    //                 $.fn.datepicker.call($(grouppicker[i]),options);
    //                 month++;
    //
    //             }
    //         },
    //         EventBind:function (year,month,day) {
    //             let _this=this,
    //                 pickernum=options.pickernum;
    //
    //             this.on("click",".toLeft,.toRight",function (e) {
    //
    //                 methods.initPickerHtml.call(_this,options);
    //                 let grouppicker=_this.find(".childpicker div");
    //
    //                 if(e.target.className=="toLeft"){
    //                     month=month-pickernum;
    //
    //                     if(month<0){
    //                         year=year-1;
    //                         month=month+12;
    //                     }
    //
    //                 }else if(e.target.className=="toRight"){
    //                     month=month+pickernum;
    //                     if(month>11){
    //                         year=year+1;
    //                         month=month-12;
    //                     }
    //                 }
    //                 methods.initGroupDate.call(_this,new Date(year,month,day));
    //                 methods.markSelectedDate.call(_this);
    //             });
    //         },
    //         beforeShowDay:function (date) {
    //
    //             let byear=date.getFullYear(),
    //                 bmonth=date.getMonth(),
    //                 bday=date.getDate(),
    //                 dayStr=`${byear}-${bmonth+1}-${bday}`;
    //
    //             if(($.inArray(dayStr,this.data("value"))>=0) && date<new Date()){
    //                 return [false,"mark"]
    //             }
    //             if(date< new Date()){
    //                 return [false,""]
    //             }
    //             return [true,""];
    //
    //         },
    //         getTargetDate:function (year,month,day) {
    //
    //             let cTarget= this.find(`td[data-month=${month}][data-year=${year}] a`).filter(function () {
    //                 return $(this).text()==day;
    //             });
    //             return cTarget;
    //         },
    //         // markSelectedDate:function () {
    //         //
    //         //     //this object refers to the jquery obj whick invoke this plugins
    //         //     let _this=this;
    //         //     $.each($(this).data("value"),function (i,item) {
    //         //         let itemArr=item.split("-"),
    //         //             syear=itemArr[0],
    //         //             smonth=itemArr[1]-1,
    //         //             sday=itemArr[2];
    //         //         let cTarget=methods.getTargetDate.call(_this,syear,smonth,sday);
    //         //         cTarget.addClass("mark");
    //         //     });
    //         //     $(this).find(".date_area").text($(this).data("value").join(";"));
    //         // },
    //         // handleSelectedDate:function ($this,cyear,cmonth,cday,id) {
    //         //
    //         //     //this object refers to the jquery obj whick invoke this plugins
    //         //     let _this=this;
    //         //     console.log('check this');
    //         //     console.log($this);
    //         //
    //         //     this.find("a").removeClass("mark");
    //         //     let dateStr=`${cyear}-${cmonth+1}-${cday}`;
    //         //     let exist=$.inArray(dateStr,$(this.data("value")));
    //         //
    //         //     if(exist>=0){
    //         //         $(this).data("value").splice(exist,1);
    //         //     }else {
    //         //         $(this).data("value").push(dateStr);
    //         //     }
    //         //
    //         //     methods.markSelectedDate.call(this);
    //         //
    //         // }
    //         // onSelect:function (dateText,obj) {
    //         //
    //         //     let cday=obj.selectedDay,
    //         //         cmonth=obj.selectedMonth,
    //         //         cyear=obj.selectedYear,
    //         //         id=obj.id;
    //         //     console.log('onSelect');
    //         //     console.log(this);
    //         //     setTimeout( methods.handleSelectedDate.bind(this,cyear,cmonth,cday,id),0);
    //         // }
    //     };
    //
    //     return this.each(function () {
    //
    //         let defaults={
    //             monthNames: [ "1月","2月","3月","4月","5月","6月",
    //                 "7月","8月","9月","10月","11月","12月" ],
    //             pickernum:2,
    //             onSelect: function (dateText,obj) {
    //
    //                 let cday=obj.selectedDay,
    //                     cmonth=obj.selectedMonth,
    //                     cyear=obj.selectedYear,
    //                     id=obj.id;
    //                 console.log('onSelect this');
    //                 console.log(this);
    //                 // setTimeout(handleSelectedDate.bind(this,cyear,cmonth,cday),0);
    //                 setTimeout(handleSelectedDate,0);
    //             },
    //             value:[],
    //             beforeShowDay:methods.beforeShowDay.bind($(this))
    //         };
    //         options=$.extend(defaults,options);
    //
    //
    //         let _this=this;
    //
    //         let iDate=new Date(),
    //             year=iDate.getFullYear()
    //         month=iDate.getMonth(),
    //             day=iDate.getDate();
    //         dateValue=options.value;
    //
    //         if(options.value && Array.isArray(options.value)){
    //             $(this).data("value",options.value);
    //         }
    //         else{
    //             $(this).data("value",[]);
    //         }
    //
    //         let $this=$(this);
    //
    //         function markSelectedDate(){
    //             console.log('mark');
    //             console.log(dateValue)
    //             //this object refers to the jquery obj whick invoke this plugins
    //             let _this=this;
    //             $.each($(this).data("value"),function (i,item) {
    //                 let itemArr=item.split("-"),
    //                     syear=itemArr[0],
    //                     smonth=itemArr[1]-1,
    //                     sday=itemArr[2];
    //                 let cTarget=methods.getTargetDate.call(_this,syear,smonth,sday);
    //                 cTarget.addClass("mark");
    //             });
    //             console.log(this);
    //             //$(this).find(".date_area").text($(this).data("value").join(";"));
    //         };
    //
    //         function handleSelectedDate(cyear,cmonth,cday,id) {
    //             console.log("this  in  handle selecteddate");
    //             console.log(this);
    //             console.log(dateValue);
    //             // //this object refers to the jquery obj whick invoke this plugins
    //             //
    //             // $(this).find("a").removeClass("mark");
    //             // let dateStr=`${cyear}-${cmonth+1}-${cday}`;
    //             // let exist=$.inArray(dateStr,$(this).data("value"));
    //             //
    //             // if(exist>=0){
    //             //     //$(this).data("value").splice(exist,1);
    //             //     dateValue.splice(exist,1);
    //             // }else {
    //             //    // $(this).data("value").push(dateStr);
    //             //     dateValue.push(dateStr);
    //             // }
    //             //
    //             // markSelectedDate.call(this);
    //
    //         };
    //
    //
    //
    //         methods.initHtml.call($(this));
    //         methods.initPickerHtml.call($(this),options);
    //         methods.initGroupDate.call($(this),iDate);
    //         methods.EventBind.call($(this),year,month,day);
    //         markSelectedDate.call($(this));
    //     });
    //
    // }



})(jQuery);