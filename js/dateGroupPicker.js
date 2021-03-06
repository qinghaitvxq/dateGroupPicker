/**
 * Created by caipf on 2017/3/9.
 */

(function($){

     class dateGroupPicker {
        constructor(target,settings){
            this.target=target;
            this.settings=settings;
            this.value=settings.value||[];

            this.iDate=new Date();
            this.year=this.iDate.getFullYear();
            this.month=this.iDate.getMonth();
            this.day=this.iDate.getDate();
        }
        init(){
            this._initHtml()._initPickerHtml()._initGroupDate()._EventBind();
        }
        _initHtml() {
            $(this.target).append(`<div class="toLeft">&laquo;</div>
                                       <div class="childpicker"></div>
                                       <div class="toRight">&raquo;</div>
                                       <div>
                                          <textarea class="date_area" readonly="readonly"></textarea>
                                       </div>`);
            return this;
        }
        _initPickerHtml() {
            let parent_em=$(this.target).find(".childpicker");
            parent_em.html("");

            let childpickerhtml="";
            for(var i=0;i<this.settings.pickernum;i++){
                childpickerhtml+=`<div class='datepicker${i}'></div>`;
            }
            parent_em.append(childpickerhtml);
            return this;
        }
        _getTargetDatePiece (target,year,month,day) {

            let cTarget= $(target).find(`td[data-month=${month}][data-year=${year}] a`).filter(function () {
                return $(this).text()==day;
            });
            return cTarget;
        }
        //init the new plugins based on the original datepicker plugins
        _initGroupDate() {
            let grouppicker=$(this.target).find(".childpicker div")

            let year=this.year,
                month=this.month,
                day=this.day;

            for(var i=0;i<grouppicker.length;i++){

                this.settings.defaultDate=new Date(year,month,day);
                this.settings.onSelect=this._onSelect.bind(this,this.target);
                this.settings.beforeShowDay=this._beforeShowDay.bind(this);

                $.fn.datepicker.call($(grouppicker[i]),this.settings);
                month++;
            }
            this._markSelectedDate(this.target);
            return this;
        }
        _EventBind() {
            let  pickernum=this.settings.pickernum;

            $(this.target).on("click",".toLeft,.toRight",(e)=> {
                if(e.target.className=="toLeft"){
                    this.month=this.month-pickernum;
                    if(this.month<0){
                        this.year=this.year-1;
                        this.month=this.month+12;
                    }

                }else if(e.target.className=="toRight"){

                    this.month=this.month+pickernum;
                    if(this.month>11){
                        this.year=this.year+1;
                        this.month=this.month-12;
                    }

                }
                this._initPickerHtml(this.target,this.settings);
                this._initGroupDate(this.target,this.settings);
            });
        }
        _onSelect (target,dateText,obj) {
            let cday=obj.selectedDay,
                cmonth=obj.selectedMonth,
                cyear=obj.selectedYear,
                id=obj.id;
            setTimeout(this._handleSelectedDate.bind(this,target,cyear,cmonth,cday),0);
        }
        _beforeShowDay(date) {

            let byear=date.getFullYear(),
                bmonth=date.getMonth(),
                bday=date.getDate(),
                dayStr=`${byear}-${bmonth+1}-${bday}`;

            if(($.inArray(dayStr,this.value)>=0) && date<new Date()){
                return [false,this.settings.markClass]
            }
            if(date< new Date()){
                return [false,""]
            }
            return [true,""];

        }
        _handleSelectedDate(target,cyear,cmonth,cday) {

            $(target).find("a").removeClass(this.markClass);

            let dateStr=`${cyear}-${cmonth+1}-${cday}`;

            let exist=$.inArray(dateStr,this.value);

            if(exist>=0){
                this.value.splice(exist,1);
            }else {
                this.value.push(dateStr);
            }
            $(target).data("value",this.value);

            this._markSelectedDate(target);
        }
        _markSelectedDate(target) {

            $.each(this.value,(i,item)=> {
                let itemArr=item.split("-"),
                    syear=itemArr[0],
                    smonth=itemArr[1]-1,
                    sday=itemArr[2];

                let cTarget=this._getTargetDatePiece(target,syear,smonth,sday);
                cTarget.addClass(this.settings.markClass);
            });
            $(target).find(".date_area").text(this.value.join(";"));
        }
     }

    $.fn.dateGroupPicker=function (options) {

        var defaults={
            pickernum:2,
            markClass:"mark",
            monthNames: [ "1月","2月","3月","4月","5月","6月","7月","8月","9月","10月","11月","12月" ]
        };
        var settings=$.extend({},defaults,options);

        return this.each(function () {
            let picker=new dateGroupPicker(this,settings);
            picker.init();
        });
    };

})(jQuery);