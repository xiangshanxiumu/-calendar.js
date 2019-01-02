(function () {

    window.Calendar = Calendar
    function Calendar(Obj) {
        this.tds = null;
        this.year = (new Date()).getFullYear();
        this.month = (new Date()).getMonth() + 1;
        this.date = (new Date()).getDate();//当前日期
        this.weekyDay = (new Date()).getDay() // 获取当天星期几

        this.init(Obj);
        this.runderTopBox(this.year, this.month, this.date)
        this.renderDays(this.year, this.month, this.date)
    }

    Calendar.prototype.init = function (Obj) {
        /*获取渲染区域id,创建并添加表格元素 匹配宽高 设置样式*/
        this.calendar = document.getElementById(Obj.id) // 获取渲染区域id
        if (Obj.width) {
            this.calendar.style.width = Obj.width
        }
        if (Obj.height) {
            this.calendar.style.height = Obj.height
        }
        this.calendar.style.border = '1px solid #ccc'
        this.calendar.style.boxSizing = 'border-box' // 设置box-sizing

        /*创建头部年-月-日 时-分-秒 星期几 div*/
        this.topDiv = document.createElement("div")
        this.calendar.appendChild(this.topDiv)
        var topDivStyle = 'width:100%;height:10%;display:flex'
        this.topDiv.style.cssText = topDivStyle
        //年-月-日 如:2019-01-02
        this.DATE = document.createElement("ul")
        this.topDiv.appendChild(this.DATE)
        var commonStyle = 'flex:1;display:flex;padding:0 0.5rem 0 0.5rem;justify-content:space-around;align-items:center'
        this.DATE.style.cssText = commonStyle
        for (var k = 0; k < 10; k++) {
            this.li = document.createElement("li")
            this.li.style.listStyle = 'none'
            this.DATE.appendChild(this.li)
        }
        //时：分：秒，如17:05:59
        this.TIME = document.createElement("ul")
        this.topDiv.appendChild(this.TIME)
        this.TIME.style.cssText = commonStyle
        for (var k = 0; k < 8; k++) {
            this.li = document.createElement("li")
            this.li.style.listStyle = 'none'
            this.TIME.appendChild(this.li)
        }
        //星期几，如 星期三
        this.WEEKYDAY = document.createElement("ul")
        this.topDiv.appendChild(this.WEEKYDAY)
        this.WEEKYDAY.style.cssText = commonStyle
        for (var k = 0; k < 3; k++) {
            this.li = document.createElement("li")
            this.li.innerText = k
            this.li.style.listStyle = 'none'
            this.WEEKYDAY.appendChild(this.li)
        }

        /*创建table并添加进calendar*/
        this.table = document.createElement("table")
        this.calendar.appendChild(this.table)

        /*设置table样式 */
        var tableStyle = 'width:100%;height:90%;border-collapse:collapse'
        this.table.style.cssText = tableStyle
        this.table.style.textAlign = 'center'

        /*创建tr th，赋值星期，添加到table*/
        var weekArr = ["日", "一", "二", "三", "四", "五", "六"];
        this.tr = document.createElement("tr");
        for (var i = 0; i < weekArr.length; i++) {
            var th = document.createElement("th");
            th.innerHTML = weekArr[i];
            this.tr.appendChild(th);
        }
        this.table.appendChild(this.tr)
        /*设置当天星期X 样式 */
        var weekyTds = this.tr.childNodes
        var currentWeekyDayStyle = 'background-color:#999;color:red'
        weekyTds[this.weekyDay].style.cssText = currentWeekyDayStyle
        /*创建日期渲染tr td，并添加到table*/
        for (var i = 0; i < 6; i++) {
            this.tr = document.createElement("tr");
            for (var j = 0; j < 7; j++) {
                this.td = document.createElement("td");
                this.tr.appendChild(this.td);
            }
            this.table.appendChild(this.tr);
        }
        /*设置tr td样式 */
        var trs = this.table.getElementsByTagName("tr")
        var trStyle = 'color:blue;border-top:1px solid blue;border-bottom:1px solid blue'
        trs[0].style.cssText = trStyle // 第一行tr 星期 设置不一样颜色样式突出
        trs[0].style.fontWeight = '700' // 加粗样式
        //trs[0].style.borderBottom = '1px solid blue' //第一行tr 星期 设置不一样的下边框样式突出

        for (var i = 1; i < trs.length - 1; i++) {
            trs[i].style.borderBottom = '1px solid' //其余tr 统一设置下边框样式
        }
        this.tds = this.table.getElementsByTagName("td");
    }

    Calendar.prototype.renderDays = function (year, month, date) {
        this.year = year;
        this.month = month;
        date && (this.date = date);
        //获取当前月第一天 是周几？利用Date()对象属性
        var thisMonthFirstDate = this.thisMonthFirstDate = new Date(year, month - 1, 1).getDay();
        //上一个末尾时间戳  获取上月多少天？
        var prevMonthSumDate = this.prevMonthSumDate = new Date(new Date(year, month - 1, 1) - 1).getDate();
        //获取本月多少天？
        var thisMonthSumDate = this.thisMonthSumDate = (function () {
            switch (month) {
                case 1:
                case 3:
                case 5:
                case 7:
                case 8:
                case 10:
                case 12:
                    return 31;
                    break;
                case 4:
                case 6:
                case 9:
                case 11:
                    return 30;
                    break;
                case 2:
                    if (year % 4 == 0 && year % 100 == 0 || year % 400 == 0) {
                        return 29;
                    }
                    return 28;
                    break;
            }
        })();
        //渲染上月
        for (var i = 0; i < thisMonthFirstDate; i++) {
            this.tds[i].innerHTML = prevMonthSumDate - thisMonthFirstDate + 1 + i;
            this.tds[i].style.backgroundColor = '#ccc'
        }

        //渲染本月
        for (var i = thisMonthFirstDate; i < thisMonthSumDate + thisMonthFirstDate; i++) {
            this.tds[i].style.fontWeight = '700'
            this.tds[i].innerHTML = i - thisMonthFirstDate + 1;
        }

        //渲染下月
        for (var i = thisMonthFirstDate + thisMonthSumDate; i < 42; i++) {
            this.tds[i].innerHTML = i - (thisMonthFirstDate + thisMonthSumDate) + 1;
            this.tds[i].style.backgroundColor = '#ccc'
        }
        /* 设置当天样式*/
        var currentDay = 'background-color:#FFBB00; color:#fff;'
        this.tds[this.thisMonthFirstDate + date - 1].style.cssText = currentDay
    }

    Calendar.prototype.runderTopBox = function (year, month, date) {
        this.year = year;
        this.month = month;
        date && (this.date = date);
        /**渲染 年-月-日 */
        var DATElis = this.DATE.getElementsByTagName("li")
        DATElis[0].innerText = parseInt(this.year / 1000)
        DATElis[1].innerText = parseInt(this.year / 100 % 10)
        DATElis[2].innerText = parseInt(this.year / 10 % 10)
        DATElis[3].innerText = parseInt(this.year % 10)
        DATElis[4].innerText = '-'
        DATElis[5].innerText = parseInt(this.month / 10 % 10)
        DATElis[6].innerText = parseInt(this.month % 10)
        DATElis[7].innerText = '-'
        DATElis[8].innerText = parseInt(this.date / 10 % 10)
        DATElis[9].innerText = parseInt(this.date % 10)
        /**渲染 时-分-秒 */
        var TIMElis = this.TIME.getElementsByTagName("li")
        setInterval(function () {
            var DATE = new Date();
            var hour = DATE.getHours();
            var minute = DATE.getMinutes();
            var second = DATE.getSeconds();
            TIMElis[0].innerText = parseInt(hour / 10);
            TIMElis[1].innerText = hour % 10;
            TIMElis[2].innerText = ':'
            TIMElis[3].innerText = parseInt(minute / 10);
            TIMElis[4].innerText = minute % 10;
            TIMElis[5].innerText = ':'
            TIMElis[6].innerText = parseInt(second / 10);
            TIMElis[7].innerText = second % 10;
        }, 1000);
        /**渲染 星期几 */
        var WEEKYDAYlis = this.WEEKYDAY.getElementsByTagName("li")
        var WeekArr = ["日", "一", "二", "三", "四", "五", "六"]
        WEEKYDAYlis[0].innerText = '星'
        WEEKYDAYlis[1].innerText = '期'
        WEEKYDAYlis[2].innerText = WeekArr[this.weekyDay]
    }
})()

