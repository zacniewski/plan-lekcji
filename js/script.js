class timeTable {
    constructor(htmlId, startMonth, startDay, numberOfMonths, startYear) {
        this.htmlId = htmlId;
        this.startDay = startDay;
        this.startMonth = startMonth;
        this.numberOfMonths = numberOfMonths;
        this.startYear = startYear;
    }

    drawTable() {
        $(this.htmlId).attr('style', 'table');
        $(this.htmlId).append(this.__getTableHeadersHtml().join(''));
        $(this.htmlId).append(this.__getSubHeadersHtml().join(''));

    }

    __getTableHeadersHtml() {
        let html = [];
        html.push('<tr class="dark-gray">');
        html.push('<td colspan="2">Mc-e</td>');
        let endMonth = this.startMonth + this.numberOfMonths;
        for (let i = this.startMonth; i <= endMonth; i++) {
            let monthOfWork = i;
            let yearOfWork = this.startYear;
            if (monthOfWork > 12) {
                monthOfWork = i - 12;
                yearOfWork++;
            }
            let numOfWeeks = this.__weeksinMonth(monthOfWork, yearOfWork);
            html.push('<td colspan="' + numOfWeeks + '">' + this.__getRomanNum(monthOfWork) + '</td>')
        }
        html.push('<td rowspan="2">Sale</td>');
        html.push('</tr>');
        return html;
    }

    __getSubHeadersHtml() {
        let html = [];
        html.push('<tr class="dark-gray">');
        html.push('<td colspan="2">dni</td>');
        let endMonth = this.startMonth + this.numberOfMonths;
        for (let i = this.startMonth; i <= endMonth; i++) {
            let nextDay = 1;
            let monthOfWork = i;
            let yearOfWork = this.startYear;
            if (monthOfWork > 12) {
                monthOfWork = i - 12;
                yearOfWork++;
            }
            let numOfWeeks = this.__weeksinMonth(monthOfWork, yearOfWork);
            let first = new Date(yearOfWork, monthOfWork - 1);
            let mondays = this.__getSameDays(first, 1);
            console.log(mondays);
            for (let y = 0; y < mondays.length; y++) {
                if (mondays[y] < 6 && mondays[y] != 1 && i == this.startMonth) {
                    let dt = new Date(2016, monthOfWork - 1, mondays[0]);
                    dt.setDate(dt.getDate() - 7);
                    html.push('<td>' + dt.getDate() +'</td>');
                }
                html.push('<td>' + mondays[y] + '</td>');
                nextDay += 7;
            }
        }
        html.push('</tr>');
        return html;
    }

    __weeksinMonth(m, y) {
        y = y || new Date().getFullYear();
        let d = new Date(y, m, 0);
        return Math.floor((d.getDate() - 1) / 7) + 1;
    }

    __getRomanNum(num) {
        let nums = [
            '0', 'I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX', 'X', 'XI', 'XII'
        ];
        return nums[num];
    }

    __getSameDays(date, dayNumber) {
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