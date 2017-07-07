/**
 * Created by caipf on 2017/7/5.
 */
(function($){
    $.fn.dateGroupPicker=function (options) {

        let methods={
            initHtml:function () {
                this.append(`<div class="toLeft">前</div>
                             <div id="childpicker"></div>
                             <div class="toRight">后</div>
                             <div>
                                <textarea class="date_area" readonly="readonly"></textarea>
                             </div>`);
            },
            initPickerHtml:function (options) {
                let parent_em=this.find("#childpicker");
                parent_em.html("");

                let childpickerhtml="";
                for(var i=0;i<options.pickernum;i++){
                    childpickerhtml+=`<div id='datepicker${i}'></div>`;
                }
                parent_em.append(childpickerhtml);

            },
            initGroupDate:function (idate) {
                let grouppicker=this.find("#childpicker div");
                let date=idate,
                    year=date.getFullYear(),
                    month=date.getMonth(),
                    day=date.getDate();

                for(var i=0;i<grouppicker.length;i++){
                    options.defaultDate=new Date(year,month,day);
                    $.fn.datepicker.call($(grouppicker[i]),options);
                    month++;
                }
            },
            EventBind:function () {
                let _this=this;
                this.on("click",".toLeft,.toRight",function (e) {

                    methods.initPickerHtml.call(_this,options);
                    let grouppicker=_this.find("#childpicker div");
                    if(e.target.className=="toLeft"){
                        month=month-2;
                        if(month<0){
                            year=year-1;
                            month=month+12;
                        }

                    }else if(e.target.className=="toRight"){
                        month=month+2;
                        if(month>11){
                            year=year+1;
                            month=month-12;
                        }
                    }
                    methods.initGroupDate.call(_this,new Date(year,month,day));
                    methods.markSelectedDate.call(_this);
                });
            },
            getTargetDate:function (year,month,day) {

                let cTarget= this.find(`td[data-month=${month}][data-year=${year}] a`).filter(function () {
                    return $(this).text()==day;
                });
                return cTarget;
            },
            markSelectedDate:function () {

                //this object refers to the jquery obj whick invoke this plugins
                let _this=this;
                $.each($(this).data("value"),function (i,item) {
                    let itemArr=item.split("-"),
                        syear=itemArr[0],
                        smonth=itemArr[1]-1,
                        sday=itemArr[2];
                    let cTarget=methods.getTargetDate.call(_this,syear,smonth,sday);
                    cTarget.addClass("mark");
                });
                $(this).find(".date_area").text($(this).data("value").join(";"));
            },
            handleSelectedDate:function (cyear,cmonth,cday,id) {

                //this object refers to the jquery obj whick invoke this plugins
                let _this=this;

                this.find("a").removeClass("mark");
                let dateStr=`${cyear}-${cmonth+1}-${cday}`;
                let exist=$.inArray(dateStr,$(this.data("value")));

                if(exist>=0){
                    $(this).data("value").splice(exist,1);
                }else {
                    $(this).data("value").push(dateStr);
                }

                methods.markSelectedDate.call(this);

            },
             onSelect:function (dateText,obj) {
                let cday=obj.selectedDay,
                    cmonth=obj.selectedMonth,
                    cyear=obj.selectedYear,
                    id=obj.id;
                 setTimeout( methods.handleSelectedDate.bind(this,cyear,cmonth,cday,id),0);
            }
        };

        let defaults={
            pickernum:2,
            onSelect:methods.onSelect.bind(this)
        };
        options=$.extend(defaults,options);

        let iDate=new Date(),
            year=iDate.getFullYear(),
            month=iDate.getMonth(),
            day=iDate.getDate();

        this.data("value",[]);

        methods.initHtml.call(this);
        methods.initPickerHtml.call(this,options);
        methods.initGroupDate.call(this,iDate);
        methods.EventBind.call(this);

    }
})(jQuery);