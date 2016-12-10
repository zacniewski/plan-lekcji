class timeTable {
    constructor(htmlId, startDate, numberOfMonths, numberOfClassHours) {
        this.htmlId = htmlId;
        this.numberOfMonths = numberOfMonths;
        this.startDate = startDate;
        this.numberOfClassHours = numberOfClassHours;
    }


    drawTable() {
        $(this.htmlId).attr('style', 'table');
        $(this.htmlId).append(this.__drawAll().join(''));
    }

    __cloneDate(date) {
        return new Date(date.getTime());
    }

    __drawAll() {
        let data = this.__generateMonthsAndDays(this.startDate);
        let html = [];
        //Header - months
        html.push('<tr class="dark-gray">');
        html.push('<td colspan="2">Mc-e</td>');
        for (let i = 0; i < this.numberOfMonths; i++) {
            html.push('<td colspan="' + data[i].numOfWeeks + '">' + data[i].roman + '</td>');
        }
        html.push('<td rowspan="2">Sale</td>');
        html.push('</tr>');
        //EOHeader

        //Hours
        for (let dayOfWeek = 1; dayOfWeek <= 7; dayOfWeek++) { // 5 - Friday, 7 - Sunday
            let dayNo = dayOfWeek == 7 ? 0 : dayOfWeek;
            //Days
            html.push('<tr class="dark-gray">');
            html.push('<td colspan="2">dni</td>');
            for (let i = 0; i < this.numberOfMonths; i++) {
                for (let y = 0; y < data[i].numOfWeeks; y++) {
                    let daynum = null;
                    if (data[i].days[dayNo][y] === undefined && i != this.numberOfMonths - 1) {
                        daynum = data[i + 1].days[dayNo][0];
                    } else {
                        daynum = data[i].days[dayNo][y];
                        if(y==0)
                        {
                            let testDate = new Date(data[i].year, data[i].month-1, daynum);

                            if(daynum < this.__getFirstMondayDayNumber(testDate)){
                                console.log(this.__getFirstMondayDayNumber(testDate));
                                console.log(testDate);
                                console.log(data[i].days[dayNo]);
                                daynum = data[i].days[dayNo][y+1];
                            }
                        }
                    }

                    if(y==0 && i != 0)
                    {
                        let testDate = new Date(data[i].year, data[i].month, 1);
                        let lastMonth = new Date(data[i].year, data[i].month, 0);
                        if(getWeekNumber(testDate) == getWeekNumber(lastMonth)){
                            continue;
                        }
                    }

                    html.push('<td>' + daynum + '</td>');
                }
            }
            html.push('</tr>');
            //EODays
            html.push('<tr><td rowspan="'+ (this.numberOfClassHours + 1) +'"><div class="vertical-text">' + this.__getWeekDayName(dayNo) + '</div></td></tr>');
            for (let numOfClass = 1; numOfClass <= this.numberOfClassHours; numOfClass++) {
                html.push('<tr><td class="dark-gray">' + numOfClass + '</td>');
                for (let i = 0; i < data.length; i++) {
                    for (let weeksNum = 0; weeksNum < data[i].numOfWeeks; weeksNum++) {
                        let day = data[i].days[dayNo][weeksNum];
                        let id = "class-" + numOfClass + "-" + data[i].year + "-" + data[i].month + "-" + day;
                        html.push('<td id="' + id + '"></td>');
                    }
                }
                html.push('<td id="salaX"></td>');
                html.push('</tr>');
            }
        }

        //EOHours
        return html;
    }

    __addMonth(date) {
        let day = date.getDate();
        date.setDate(15);
        date = new Date(new Date(date).setMonth(date.getMonth() + 1));
        date.setDate(day);
        return date;
    }

    __weeksinMonth(date) {
        let first = this.__cloneDate(date);
        let last = this.__cloneDate(date);
        first.setDate(1);
        last = this.__addMonth(last);
        last = new Date(last.getFullYear(), last.getMonth(), 0);
        let firstWeekNo = getWeekNumber(first);
        let lastWeekNo = getWeekNumber(last);
        if (firstWeekNo > lastWeekNo) {
            lastWeekNo += 52;
        }
        return lastWeekNo - firstWeekNo + 1;

    }

    __generateMonthsAndDays(date) {
        let dt = this.__cloneDate(date);
        dt.setDate(1);
        let data = [];
        for (let i = 0; i < this.numberOfMonths; i++) {
            let monthNo = dt.getMonth() + 1;
            let roman = this.__getRomanNum(monthNo);
            let numOfWeeks = this.__weeksinMonth(dt);
            if (dt.getDay() != 1) numOfWeeks--;
            let days = [];
            for (let day = 0; day <= 6; day++) {
                days[day] = this.__getSameDays(dt, day);
            }

            data[i] = {
                roman: roman,
                numOfWeeks: numOfWeeks,
                days: days,
                year: dt.getFullYear(),
                month: dt.getMonth() + 1
            };
            dt = this.__addMonth(dt);
        }
        return data;
    }

    __getRomanNum(num) {
        while (num > 12) {
            num -= 12;
        }
        let nums = [
            '0', 'I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX', 'X', 'XI', 'XII'
        ];
        return nums[num];
    }

    __getWeekDayName(dayNo) {
        let names = [
            'Niedziela', 'Poniedzialek', 'Wtorek', 'Środa', 'Czwartek', 'Piątek', 'Sobota', 'Niedziela'
        ]
        return names[dayNo];
    }


    __getSameDays(date1, dayNumber) {
        let date = this.__cloneDate(date1);
        let month = date.getMonth(), sameDays = [];
        date.setDate(1);
        while (date.getDay() !== dayNumber) {
            date.setDate(date.getDate() + 1);
        }
        while (date.getMonth() === month) {
            sameDays.push(date.getDate());
            date.setDate(date.getDate() + 7);
        }
        return sameDays;
    }

    __getFirstMondayDayNumber(date)
    {
        let dt = this.__cloneDate(date);
        dt.setDate(1);
        for(let i = 1; i < 10; i++)
        {
            if(dt.getDay() == 1)
            {
                console.log("s",dt);
                return dt.getDate();
            }
            dt.setDate(i);
        }

    }
}

function getWeekNumber(d) {
    d = new Date(+d);
    d.setHours(0, 0, 0, 0);
    d.setDate(d.getDate() + 4 - (d.getDay() || 7));
    let yearStart = new Date(d.getFullYear(), 0, 1);
    return Math.ceil(( ( (d - yearStart) / 86400000) + 1) / 7);

}
