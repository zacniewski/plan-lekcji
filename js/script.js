class timeTable {
    constructor(htmlId, startDate, numberOfMonths) {
        this.htmlId = htmlId;
        this.numberOfMonths = numberOfMonths;
        this.startDate = startDate;
    }


    drawTable() {
        $(this.htmlId).attr('style', 'table');
        $(this.htmlId).append(this.__getTableHeadersHtml().join(''));
        $(this.htmlId).append(this.__getDayHeaders(1).join(''));
    }

    __cloneDate(date) {
        return new Date(date.getTime());
    }

    __getTableHeadersHtml() {
        let html = [];
        html.push('<tr class="dark-gray">');
        html.push('<td colspan="2">Mc-e</td>');
        let objectOfWork = this.__cloneDate(this.startDate);
        console.log(objectOfWork);
        for (let i = 1; i <= this.numberOfMonths; i++) {
            let numOfWeeks = this.__weeksinMonth(objectOfWork);
            html.push('<td colspan="' + numOfWeeks + '">' + this.__getRomanNum(objectOfWork.getMonth() + 1) + '</td>');
            objectOfWork = this.__addMonth(objectOfWork);
        }
        html.push('<td rowspan="2">Sale</td>');
        html.push('</tr>');
        return html;
    }

    __getDayHeaders(day) {
        let html = [];
        html.push('<tr class="dark-gray">');
        html.push('<td colspan="2">dni</td>');
        let objectOfWork = this.__cloneDate(this.startDate);
        for (let i = 0; i < this.numberOfMonths; i++) {
            objectOfWork.setDate(1);
            let mondays = this.__getSameDays(objectOfWork, day);
            let lastMonthDayIncluded = false;
            console.log(mondays, objectOfWork);
            for (let y = 0; y < mondays.length; y++) {
                if (mondays[0] <= 7 && mondays[0] != 1 && objectOfWork.getMonth() == this.startDate.getMonth() && !lastMonthDayIncluded) {
                    let dt = this.__cloneDate(objectOfWork);
                    dt.setDate(mondays[0]);
                    dt.setDate(dt.getDate() - 7);
                    html.push('<td>' + dt.getDate() + '</td>');
                    lastMonthDayIncluded = true;
                }
                html.push('<td>' + mondays[y] + '</td>');
            }
            objectOfWork = this.__addMonth(objectOfWork);
        }
        html.push('</tr>');
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
        let y = date.getFullYear();
        let m = date.getMonth() + 1;
        y = y || new Date().getFullYear();
        let d = new Date(y, m, 0);
        return Math.floor((d.getDate() - 1) / 7) + 1;
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
}
