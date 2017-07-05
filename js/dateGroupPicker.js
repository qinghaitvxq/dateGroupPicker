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
                                <textarea class="date_area"></textarea>
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
                    // methods.initHtml.call(_this,options);
                    methods.initPickerHtml.call(_this,options);
                    let grouppicker=_this.find("#childpicker div");
                    if(e.target.className=="toLeft"){
                        month=month-1;
                    }else if(e.target.className=="toRight"){
                        month=month+1;
                    }
                    methods.initGroupDate.call(_this,new Date(year,month,day));
                });
            },
            onSelect:function (dateText,obj) {
                dateRange=dateRange.concat(`;${dateText}`);
                let currentDay=obj.currentDay;
                let currentTd=$(`#${obj.id}`).find("a").filter(function (index) {

                    // console.log($(this).text());
                    // return $(this).text()===currentDay;

                    if($(this).text()===currentDay){
                        console.log('check this');
                        console.log(this);
                      $(this).html("");
                    }
                });


                this.find(".date_area").text(dateRange);

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
        let dateRange="";

        methods.initHtml.call(this);
        methods.initPickerHtml.call(this,options);

        methods.initGroupDate.call(this,iDate);
        methods.EventBind.call(this);

    }
})(jQuery);