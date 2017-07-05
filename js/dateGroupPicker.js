/**
 * Created by caipf on 2017/7/5.
 */
(function($){
    $.fn.dateGroupPicker=function (options) {
        let _this=this;
        let methods={
            initHtml:function (options) {
                this.html("");
                let childpickerhtml="";
                for(var i=0;i<options.pickernum;i++){
                    childpickerhtml+=`<div id='datepicker${i}'></div>`;
                }
                this.append(`<div class="toLeft">前</div>
                          <div id="childpicker">${childpickerhtml}</div>
                      <div class="toRight">后</div>`);
            },

            initGroupDate:function (grouppicker,idate) {
                let date=idate,
                    year=date.getFullYear(),
                    month=date.getMonth(),
                    day=date.getDate();

                for(var i=0;i<grouppicker.length;i++){
                    options.defaultDate=new Date(year,month,day);
                    $.fn.datepicker.call($(grouppicker[i]),options);
                    month++;
                }
            }
        };

        let defaults={
          pickernum:2
        };

        options=$.extend(defaults,options);

        methods.initHtml.call(this,options);

        let iDate=new Date();
        let grouppicker=this.find("#childpicker div");
        methods.initGroupDate(grouppicker,iDate);

        let year=iDate.getFullYear(),
            month=iDate.getMonth(),
            day=iDate.getDate();

        this.on("click",".toLeft,.toRight",function (e) {
            methods.initHtml.call(_this,options);
            let grouppicker=_this.find("#childpicker div");
            if(e.target.className=="toLeft"){
                month=month-1;
            }else if(e.target.className=="toRight"){
                month=month+1;
            }
            methods.initGroupDate(grouppicker,new Date(year,month,day));
        });


    }
})(jQuery);