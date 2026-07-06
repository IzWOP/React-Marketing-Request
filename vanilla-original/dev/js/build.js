//login and logout info
class Auth {
    init() {
        this.render();
    }

    setCookie = (cname, cvalue, exdays) => {
        var d = new Date();
        d.setTime(d.getTime() + exdays * 24 * 60 * 60 * 1000);
        var expires = "expires=" + d.toUTCString();
        document.cookie = `${cname} = ${cvalue}; ${expires};`;
    };

    getCookie = (cname) => {
        var name = cname + "=";
        var ca = document.cookie.split(';');
        for (var i = 0; i < ca.length; i++) {
            var c = ca[i];
            while (c.charAt(0) == ' ') {
                c = c.substring(1);
            }
            if (c.indexOf(name) == 0) {
                return c.substring(name.length, c.length);
            }
        }
        return "";
    }

    logout() {
        // 1 - if cookie exists delete cookie
        document.cookie = "loggedin=null; expires=Thu, 18 Dec 2013 12:00:00 UTC;";
        // 2 - redirect to login page
        return window.location.href = "/";
        // unset loggedin var
    }

    login() {
        var user = Number(this.verifyUser());

        if (user) {
            return window.location.href = "/app";
        }


        var form = document.getElementById('pw-form');
        var submit = form.querySelector("button");
        submit.addEventListener("click", e => {
            e.preventDefault();
            var pass = {};
            pass['pw'] = form.pw.value;
            $.post("/api/v1/auth/verify", pass, () => {
                this.setCookie("loggedin", 1, 30);
                return window.location.href = "/app";
            }).fail(error => {
                var errEl = document.createElement('p');
                errEl.innerHTML = 'Please Try Again'
                errEl.classList.add("pwerror");
                pw.parentElement.prepend(errEl);
                return false;
            });

        });
    }

    thankYou() {
        var user = Number(this.verifyUser());
        if (!user) {
            return window.location.href = "/";
        }
        window.location.href = "/thankYou"
    }

    verifyUser() {
        // if no cookie exists send to home page
        return this.getCookie("loggedin");
    }

    appPage() {
        var user = Number(this.verifyUser());
        if (!user) {
            return window.location.href = "/";
        }


        app.init();

    }

    render() {
        switch (document.location.pathname) {

            case "/":
                window.location.hash = "login";
                this.login();
                break;

            case "/app":
                this.appPage();
                break;

            case "/logout":
                this.logout();
                break;

            case "/thankYou":
                thankYouPage();
                break;

            default:
                window.location.href = "/";
                break;
        }
    }

}
//inits the app and sends you to correct section
class App {

    init() {
        this.introSection();
    }

    introSection() {
        let threeIntro = document.getElementById('introsec');
        threeIntro.style.display = 'block';
        var cards = document.getElementById('introsec').getElementsByClassName('card');
        var validName = document.getElementById('firstandLastName').value;
        $('#nameModal').modal({
            backdrop: 'static',
            keyboard: false
        })
        if (validName != "") {
            $('#nameModal').modal('hide');
        } else {
            $('#nameModal').modal('show');
            modalValidation();
        }

        for (let i = 0; i < cards.length; i++) {
            cards[i].addEventListener("click", (e) => {
                e.preventDefault();
                var clickedCard = e.target.id.toString();
                switch (clickedCard) {
                    case "events":
                        threeIntro.style.display = 'none';
                        eventFormWorkflow();
                        break;

                    case "design":
                        // remove current cards displayed
                        threeIntro.style.display = 'none';
                        designWorkFlow();
                        break;

                    case "content":
                        // remove current cards displayed
                        threeIntro.style.display = 'none';
                        contentWorkFlow();
                        break;

                    default:
                        return false;
                        break;
                }

            });
        }

        window.onpopstate = function () {
            this.alert('Going Back Is going To Clear all Work');
            document.forms["eventForm1"].reset();
            window.history.back();
        };
    }
}
//event section all together 
var eventFormWorkflow = () => {

    // Step 1 - eventCont1
    function eventsForm() {
        //sets location and hides introsec and opens event sec
        let eventSec = document.getElementById('eventSec');
        let x = document.getElementById('eventCont1');
        $('#eventdate').daterangepicker({
            "singleDatePicker": true,
            "startDate": now,
        });
        //listens for next button trigger to next step
        document.getElementById('ef1Next').addEventListener('click', (e) => {
            e.preventDefault();
            x.style.display = 'none';
            evtAction();
        });

        document.getElementById('eventCont1Back').addEventListener('click', (e) => {
            e.preventDefault();
            x.style.display = 'none';
            eventSec.style.display = 'none';
            app.init();
        });

        eventSec.style.display = 'block';
        x.style.display = 'flex';
        //changes progress bar to 25%
        document.getElementById('eventBar').style.width = '25%';
    }

    // Step 2 - eventCont2
    function evtAction() {
        let action = document.getElementById('eventCont2');

        var row = document.getElementById('optionsThreeRow');
        var children = row.children;
        for (let i = 0; i < children.length; i++) {
            children[i].addEventListener("click", (e) => {
                e.preventDefault();
                var clickedCard = e.target.id.toString();

                switch (clickedCard) {
                    case "Promotional":
                        action.style.display = 'none';
                        promoSec();
                        break;

                    case "Literature":
                        // remove current cards displayed
                        action.style.display = 'none';
                        printSec();
                        break;

                    case "Booth Supplies":
                        // remove current cards displayed
                        action.style.display = 'none';
                        boothSec();

                        break;

                    default:
                        return false;
                        break;
                }

            });
        }

        document.getElementById('eventThreeSelection').addEventListener('click', (e) => {
            e.preventDefault();
            action.style.display = 'none';
            eventsForm();
        });

        //init
        action.style.display = 'flex';
        //changes progress bar 
        document.getElementById('eventBar').style.width = '50%';

    }

    function promoSec() {
        let promoCont = document.getElementById('eventCont3');
        document.getElementById('boothDiv').style.display = 'none';
        document.getElementById('lit').style.display = 'none';
        //by default all hidden now showing only promo inputs
        let promoRow = document.getElementById('promo');



        //event listener on button to next section
        document.getElementById('promoNext').addEventListener('click', function (e) {
            e.preventDefault();
            promoRow.style.display = 'none';
            promoCont.style.display = 'none';
            eventSubmit(history);
        });

        //  window.onpopstate = random.previousStep('promo', 'eventCont2');
        document.getElementById('promoBack').addEventListener('click', (e) => {
            e.preventDefault();
            promoRow.style.display = 'none';
            promoCont.style.display = 'none';
            evtAction();
        });
        //init
        const history = 'promo';
        promoRow.style.display = 'block';
        promoCont.style.display = 'flex';
        //changes progress bar to 75%
        document.getElementById('eventBar').style.width = '75%';
    };

    function printSec() {
        let printCont = document.getElementById('eventCont3');
        document.getElementById('boothDiv').style.display = 'none';
        document.getElementById('promo').style.display = 'none';
        //by default all hidden now showing only print inputs
        let printRow = document.getElementById('lit');
        //event listener on button to next section
        document.getElementById('litNext').addEventListener('click', function (e) {
            e.preventDefault();
            printCont.style.display = 'none';
            printRow.style.display = 'none';
            eventSubmit(history);
        });

        document.getElementById('litBack').addEventListener('click', (e) => {
            e.preventDefault();
            printCont.style.display = 'none';
            printRow.style.display = 'none';
            evtAction();
        });
        const history = 'print';
        printCont.style.display = 'flex';
        printRow.style.display = 'block';
        //changes progress bar to 75%
        document.getElementById('eventBar').style.width = '75%';
    };

    function boothSec() {
        document.getElementById('promo').style.display = 'none';
        document.getElementById('lit').style.display = 'none';
        let boothCont = document.getElementById('eventCont3');
        let boothRow = document.getElementById('boothDiv');
        //by default all hidden now showing only booth inputs
        //event listener on button to next section
        document.getElementById('boothNext').addEventListener('click', function (e) {
            e.preventDefault();
            boothCont.style.display = 'none';
            boothRow.style.display = 'none';
            eventSubmit(history);
        })
        document.getElementById('boothBack').addEventListener('click', (e) => {
            e.preventDefault();
            boothRow.style.display = 'none';
            boothCont.style.display = 'none';
            evtAction();
        })
        const history = 'booth';
        boothRow.style.display = 'block';
        boothCont.style.display = 'flex';
        //changes progress bar to 75%
        document.getElementById('eventBar').style.width = '75%';

    };

    function eventSubmit(history) {
        let lastCont = document.getElementById('eventCont4');
        lastCont.style.display = 'flex';
        $('#eventDeliveryDate').daterangepicker({
            "singleDatePicker": true,
            "startDate": now,
        });
         $
        //changes progress bar to 100%
        document.getElementById('eventBar').style.width = '100%';
        $("#eventForm1").submit(function (event) {
            event.preventDefault();
            //loading circle and error
            var gifLoc = document.getElementById('eventSubmit4Load');
            var gifLoading = document.getElementById('eventSubmit4Loading');
            var errorNotif = document.getElementById('eventSubmit4Error');
            showDiv(gifLoc, gifLoading, errorNotif);
            var sbmtdEvent = objectifyForm($(this).serializeArray()); // serialize form and convert to object
            //clean said obj
            clean(sbmtdEvent);

            //grab needed info
            var date = sbmtdEvent["eventDeliveryDate"];
            var taskName = sbmtdEvent['Event Name'];
            //html before submitting to asana
            var htmlBody = putIntoHtml(sbmtdEvent);
            //the submitting to asana and checking for attachments
            $.get('/api/v1/auth/submitKey', (key) => {
                setTimeout(function () {
                    $.when(submitAsana(htmlBody, taskName, date, key,0))
                        .then(() => {
                            lastCont.style.display = 'none';
                            login.thankYou();
                        });
                }, 3000);
            });

        });
        //send you back to the correct section
        document.getElementById('eventSubmitBack').addEventListener("click", (e) => {
            e.preventDefault();
            switch (history) {
                case "promo":
                    //hide current section before sending you back
                    lastCont.style.display = 'none';
                    promoSec();
                    break;

                case "print":
                    lastCont.style.display = 'none';
                    printSec();
                    break;

                case "booth":
                    lastCont.style.display = 'none';
                    boothSec();
                    break;

                default:
                    return false;
            }

        });
    }
    //init
    eventsForm();
}
//design section all together
var designWorkFlow = () => {
    //starts design section
    function doubleSelection() {
        let dsec = document.getElementById('designSec');
        let dubCont = document.getElementById('designCont1');
        var row = document.getElementById('twoChoices');
        var children = row.children;
        for (let i = 0; i < children.length; i++) {
            children[i].addEventListener("click", (e) => {
                e.preventDefault();
                var clickedCard = e.target.id.toString();
                //checks to see what was chosen
                switch (clickedCard) {
                    case "optionOne":
                        dubCont.style.display = 'none';

                        updatingDesign();
                        break;

                    case "optionTwo":
                        dubCont.style.display = 'none';
                        newDesignDecision();
                        break;
                    default:
                        return false;
                        break;
                }

            });
        }

        document.getElementById('designTwoChoicesBack').addEventListener('click', (e) => {
            e.preventDefault();
            dubCont.style.display = 'none';
            dsec.style.display = 'none';
            app.init();
        });

        //init
        dubCont.style.display = 'flex';
        dsec.style.display = 'block';
        //changes progress bar to 25%
        document.getElementById('designBar').style.width = '25%';
    }

    function updatingDesign() {
        //gets information for update and submits
        let udCont = document.getElementById('designCont2');
        let udSec = document.getElementById('designSec');
        $('#updateDesignDeliveryDate').daterangepicker({
            "singleDatePicker": true,
            "startDate": now,
        });    
        $("#eventForm1").submit(function (event) {
            event.preventDefault();
            //loading and error
            var gifLoc = document.getElementById('designSubmit2Load');
            var gifLoading = document.getElementById('designSubmit2Loading');
            var errorNotif = document.getElementById('designSubmit2Error');
            showDiv(gifLoc, gifLoading, errorNotif);
            var sbmtdEvent = objectifyForm($(this).serializeArray()); // serialize form and convert to object
            //cleans the object of blanks
            clean(sbmtdEvent);
            //setting deadline date
            var designFilePrint = document.getElementById('designFile').files[0];
            var date = sbmtdEvent["updateDesignDeliveryDate"];
            //setting task name
            var taskName = sbmtdEvent['Design Project'];
            //sets up obj => html to look nice in asana
            var htmlBody = putIntoHtml(sbmtdEvent);
            //submitted to asana
            $.get('/api/v1/auth/submitKey', (key) => {
                setTimeout(function () {
                    $.when(submitAsana(htmlBody, taskName, date, key, 0, designFilePrint))
                        .then(() => {
                            udSec.style.display = 'none';
                            udCont.style.display = 'none';
                            login.thankYou();
                        });
                }, 3000);
            });
        });

        //back button listen
        document.getElementById('updatedDesignBack').addEventListener('click', (e) => {
            e.preventDefault();
            udCont.style.display = 'none';
            doubleSelection();
        });

        //init
        udCont.style.display = 'block';
        //changes progress bar to 100%
        document.getElementById('designBar').style.width = '100%';
    }

    function newDesignDecision() {
        let ndCont = document.getElementById('designCont3');
        //listens for when the user moves to next section
        document.getElementById('designCont3Next').addEventListener('click', (e) => {
            e.preventDefault();
            ndCont.style.display = 'none';
            designType();
        });

        //back button listen
        document.getElementById('dCont3Back').addEventListener('click', (e) => {
            e.preventDefault();
            ndCont.style.display = 'none';
            doubleSelection();
        });

        //init newdesignsecision
        ndCont.style.display = 'flex';
        //changes progress bar to 25%
        document.getElementById('designBar').style.width = '43%';
    };

    function designType() {
        let dtCont = document.getElementById('designCont4');
        //sets up either print or digital choice
        var row = document.getElementById('designType');
        var children = row.children;
        for (let i = 0; i < children.length; i++) {
            children[i].addEventListener("click", (e) => {
                e.preventDefault();
                var clickedCard = e.target.id.toString();
                //checks to see what was chosen
                switch (clickedCard) {
                    case "print":
                        dtCont.style.display = 'none';
                        printCheckBox();
                        break;

                    case "digital":
                        dtCont.style.display = 'none';
                        digitalCheckBox();
                        break;
                    default:
                        return false;
                        break;

                }

            });
        }

        document.getElementById('designTypeBack').addEventListener('click', (e) => {
            e.preventDefault();
            dtCont.style.display = 'none';
            newDesignDecision();
        });
        //init designType
        dtCont.style.display = 'flex';
        //changes progress bar to 25%
        document.getElementById('designBar').style.width = '70%';

    }

    function printCheckBox() {
        //selects type of print choice
        let pcbSec = document.getElementById('printCheckBox');
        let pcbCont = document.getElementById('designCont5');
        // listen for next button click
        document.getElementById('printCheckNext').addEventListener('click', (e) => {
            e.preventDefault();
            // random.nextStep('designCont5', 'designCont6');
            pcbCont.style.display = 'none';
            pcbSec.style.display = 'none';
            designSubmit(dHistory);
        });

        // listen for back button click
        document.getElementById('printCheckBack').addEventListener('click', (e) => {
            e.preventDefault();
            // random.previousStep('designCont5', 'designCont4');
            pcbCont.style.display = 'none';
            pcbSec.style.display = 'none';
            designType();

        });

        // init sec
        pcbCont.style.display = 'block';
        pcbSec.style.display = 'block';
        //changes progress bar to 25%
        document.getElementById('designBar').style.width = '90%';
        let dHistory = 'printCheck'; //sets variable to know where to return(think cookie)
    };

    function digitalCheckBox() {
        //selects type of digital choice
        let dcbCont = document.getElementById('designCont5');
        let dcbSec = document.getElementById('digitalCheckbox');
        //sets variable to know where to return(think cookie)

        document.getElementById('digitalCheckNext').addEventListener('click', (i) => {
            i.preventDefault();
            dcbCont.style.display = 'none';
            dcbSec.style.display = 'none';
            designSubmit(dHistory);

        });
        //returns to previous two choices
        document.getElementById('digitalCheckBack').addEventListener('click', (e) => {
            e.preventDefault();
            dcbCont.style.display = 'none';
            dcbSec.style.display = 'none';
            designType();

        });
        //init section 
        dcbCont.style.display = 'block';
        dcbSec.style.display = 'block';
        //changes progress bar to 80%
        document.getElementById('designBar').style.width = '90%';
        let dHistory = 'digitalCheck';
    };

    function designSubmit(dHistory) {
        let dsCont = document.getElementById('designCont6');
        $('#designDeliveryDateSummary').daterangepicker({
            "singleDatePicker": true,
            "startDate": now,
        });
        //listens and waits to submit
        $("#eventForm1").submit(function (event) {
            event.preventDefault();
            $("input[type='submit']", this)

                .attr('disabled', 'disabled');

            
            //error and loading
            var gifLoc = document.getElementById('designSubmit6Load');
            var gifLoading = document.getElementById('designSubmit6Loading');
            var errorNotif = document.getElementById('designSubmit6Error');
            showDiv(gifLoc, gifLoading, errorNotif);
            var sbmtdEvent = objectifyForm($(this).serializeArray()); // serialize form and convert to object
            clean(sbmtdEvent);
            //sets task name in Asana
            var taskName = sbmtdEvent['Design Name'];
            var date = sbmtdEvent["designDeliveryDateSummary"];
            var designOther1 = document.getElementById('designOther1').value;
            var designOther2 = document.getElementById('designOther2').value;
            var designFileDigital = document.getElementById('designEx').files[0];
            var designFilePrint = document.getElementById('designFileExample').files[0];
            console.log(designOther1);
            console.log(designOther2);
            

            
            
            var subtaskName;
            if (!isEmpty(designOther1)) {
                subtaskName = designOther1;
            } else if (!isEmpty(designOther2)) {
                subtaskName = designOther2;
            } else {
                subtaskName = 0;
            }
            var fileID;
            if (document.getElementById('designEx').files[0]!= "") {
                fileID = designFilePrint;
            } else if (document.getElementById('designExample').files[0] !="") {
                fileID = designFileDigital;
            }
            console.log(fileID);

            var htmlBody = putIntoHtml(sbmtdEvent);

            $.get('/api/v1/auth/submitKey', (key) => {
                setTimeout(function () {
                    $.when(submitAsana(htmlBody, taskName, date, key, subtaskName, fileID))
                        .then(() => {
                            dsCont.style.display = 'none';
                            login.thankYou();
                        });
                }, 3000);
            });
        });
        //grabs passed param variable to know where to return to
        document.getElementById('designBackSubmit').addEventListener("click", (e) => {
            e.preventDefault();
            switch (dHistory) {

                case "digitalCheck":
                    document.getElementById('printCheckBox').style.display = 'none';
                    dsCont.style.display = 'none';
                    digitalCheckBox();
                    break;

                case "printCheck":
                    document.getElementById('digitalCheckbox').style.display = 'none';
                    // remove dsent cards displayed
                    dsCont.style.display = 'none';
                    printCheckBox();
                    break;

                default:
                    return false;

            }

        });
        dsCont.style.display = 'flex';
        //changes progress bar to 25%
        document.getElementById('designBar').style.width = '100%';
    }

    doubleSelection();

}
//writing section all together
var contentWorkFlow = () => {

    function writingHex() {
        var dHSec = document.getElementById('writingSec');

        var threeIntro = document.getElementById('writeCont1');
        threeIntro.style.display = 'block';

        var hexChoices = document.getElementById('hexCont').getElementsByClassName('content');
        for (let i = 0; i < hexChoices.length; i++) {
            hexChoices[i].addEventListener("click", (e) => {
                e.preventDefault();
                var clickedHex = e.target.id.toString();
                switch (clickedHex) {
                    case "Blog":
                        threeIntro.style.display = 'none';
                        writeBlog();
                        break;

                    case "Ebook":
                        threeIntro.style.display = 'none';
                        writeEBook();
                        break;

                    case "whitePaper":
                        threeIntro.style.display = 'none';
                        writeWhitePaper();
                        break;

                    case "CaseStudy":
                        threeIntro.style.display = 'none';
                        writeCaseStudy();
                        break;

                    case "Edits":
                        threeIntro.style.display = 'none';
                        writeEdits();
                        break;

                    case "Other":
                        threeIntro.style.display = 'none';
                        writeOther();
                        break;

                    default:
                        return false;
                        break;
                }

            });
        }

        document.getElementById('hexContBack').addEventListener('click', (e) => {
            e.preventDefault();
            threeIntro.style.display = 'none';
            dHSec.style.display = 'none';
            app.init();
        });
        threeIntro.style.display = 'flex';
        dHSec.style.display = 'block';
        //changes progress bar to current progress
        document.getElementById('writeBar').style.width = '50%';
    }

    function writeBlog() {
        let wbCont = document.getElementById('writeCont2');
        $('#blogDeliveryDate').daterangepicker({
            "singleDatePicker": true,
            "startDate": now,
        });
    
        $("#eventForm1").submit(function (event) {
            event.preventDefault();
            //loading and error 
            var gifLoc = document.getElementById('blogSubmitLoad');
            var gifLoading = document.getElementById('blogSubmitLoading');
            var errorNotif = document.getElementById('blogSubmitError');
            showDiv(gifLoc, gifLoading, errorNotif);

            var sbmtdEvent = objectifyForm($(this).serializeArray()); // serialize form and convert to object
            clean(sbmtdEvent);
            var date = sbmtdEvent["blogDeliveryDate"];
            //sets task name in Asana
            var taskName = 'Blog Request';
            //sets up obj => html to look nice in asana
            var htmlBody = putIntoHtml(sbmtdEvent);
            //submitted to asana

            $.get('/api/v1/auth/submitKey', (key) => {
                setTimeout(function () {
                    $.when(submitAsana(htmlBody, taskName, date, key,0))
                        .then(() => {
                            wbCont.style.display = 'none';
                            login.thankYou();
                        });
                }, 3000);
            });
        });
        //back button closes the section and sends to the 6 choices
        document.getElementById('blogBack').addEventListener('click', (e) => {
            e.preventDefault();
            wbCont.style.display = 'none';
            writingHex();
        });
        //init opens it up
        wbCont.style.display = 'block';
        //changes progress bar to current progress
        document.getElementById('writeBar').style.width = '100%';
    }

    function writeEBook() {
        let ebCont = document.getElementById('writeCont3');
        $('#eBookDelivery').daterangepicker({
            "singleDatePicker": true,
            "startDate": now,
        });
    
        $("#eventForm1").submit(function (event) {
            event.preventDefault();
            //load and error
            var gifLoc = document.getElementById('eBookSubmitLoad');
            var gifLoading = document.getElementById('eBookSubmitLoading');
            var errorNotif = document.getElementById('eBookSubmitError');
            showDiv(gifLoc, gifLoading, errorNotif);
            var sbmtdEvent = objectifyForm($(this).serializeArray()); // serialize form and convert to object
            clean(sbmtdEvent);
            var date = sbmtdEvent["eBookDelivery"];
            //sets task name in Asana
            var taskName = 'Ebook Request';
            //sets up obj => html to look nice in asana
            var htmlBody = putIntoHtml(sbmtdEvent);
            //submitted to asana

            $.get('/api/v1/auth/submitKey', (key) => {
                setTimeout(function () {
                    $.when(submitAsana(htmlBody, taskName, date, key))
                        .then(() => {
                            ebCont.style.display = 'none';
                            login.thankYou();
                        });
                }, 3000);
            });
        });
        //back button closes the section and sends to the 6 choices
        document.getElementById('eBookBack').addEventListener('click', (e) => {
            e.preventDefault();
            ebCont.style.display = 'none';
            writingHex();
        });
        //init
        ebCont.style.display = 'block';
        //changes progress bar to current progress
        document.getElementById('writeBar').style.width = '100%';
    }

    function writeWhitePaper() {
        let wwpCont = document.getElementById('writeCont4');
        $('#wpDeliveryDate').daterangepicker({
            "singleDatePicker": true,
            "startDate": now,
        });
    
        $("#eventForm1").submit(function (event) {
            event.preventDefault();
            //loaindg and error
            var gifLoc = document.getElementById('wpSubmitLoad');
            var gifLoading = document.getElementById('wpSubmitLoading');
            var errorNotif = document.getElementById('wpSubmitError');
            showDiv(gifLoc, gifLoading, errorNotif);
            var sbmtdEvent = objectifyForm($(this).serializeArray()); // serialize form and convert to object
            clean(sbmtdEvent);
            var date = sbmtdEvent["wpDeliveryDate"];
            //sets task name in Asana
            var taskName = 'White Paper Request';
            //sets up obj => html to look nice in asana
            var htmlBody = putIntoHtml(sbmtdEvent);
            //submitted to asana

            $.get('/api/v1/auth/submitKey', (key) => {
                setTimeout(function () {
                    jQuery.when(submitAsana(htmlBody, taskName, date, key))
                        .then(() => {
                            wwpCont.style.display = 'none';
                            login.thankYou();
                        });
                }, 3000);
            });
        });

        document.getElementById('wpBack').addEventListener('click', (e) => {
            e.preventDefault();
            wwpCont.style.display = 'none';
            writingHex();
        });
        wwpCont.style.display = 'block';
        //changes progress bar to current progress
        document.getElementById('writeBar').style.width = '100%';

    }

    function writeCaseStudy() {
        let wcsCont = document.getElementById('writeCont5');
        $('#csDeliveryDate').daterangepicker({
            "singleDatePicker": true,
            "startDate": now,
        });
         $
        $("#eventForm1").submit(function (event) {
            event.preventDefault();
            //load and erro
            var gifLoc = document.getElementById('csSubmitLoad');
            var gifLoading = document.getElementById('csSubmitLoading');
            var errorNotif = document.getElementById('csSubmitError');
            showDiv(gifLoc, gifLoading, errorNotif);
            var sbmtdEvent = objectifyForm($(this).serializeArray()); // serialize form and convert to object
            clean(sbmtdEvent);
            var date = sbmtdEvent["Deadline"];
            //sets task name in Asana
            var taskName = 'Case Study Request';
            //sets up obj => html to look nice in asana
            var htmlBody = putIntoHtml(sbmtdEvent);
            //submitted to asana

            $.get('/api/v1/auth/submitKey', (key) => {
                setTimeout(function () {
                    $.when(submitAsana(htmlBody, taskName, date, key, 0))
                        .then(() => {
                            wcsCont.style.display = 'none';
                            login.thankYou();
                        });
                }, 3000);
            });
        });
        //back to original 6 options
        document.getElementById('csBack').addEventListener('click', (e) => {
            e.preventDefault();
            wcsCont.style.display = 'none';
            writingHex();
        });
        //init
        wcsCont.style.display = 'block';
        //changes progress bar to current progress
        document.getElementById('writeBar').style.width = '100%';
    }

    function writeEdits() {
        let weCont = document.getElementById('writeCont6');
        $('#editDeliveryDate').daterangepicker({
            "singleDatePicker": true,
            "startDate": now,
        });

        $("#eventForm1").submit(function (event) {
            event.preventDefault();
            //loading and error
            var gifLoc = document.getElementById('editsSubmitLoad');
            var gifLoading = document.getElementById('editsSubmitLoading');
            var errorNotif = document.getElementById('editsSubmitError');
            showDiv(gifLoc, gifLoading, errorNotif);

            var sbmtdEvent = objectifyForm($(this).serializeArray()); // serialize form and convert to object
            clean(sbmtdEvent);
            var date = sbmtdEvent["editDeliveryDate"];
            //sets task name in Asana
            var taskName = sbmtdEvent['editProjectName'];
            //sets up obj => html to look nice in asana
            var htmlBody = putIntoHtml(sbmtdEvent);
            //submitted to asana
            var writeEditsFile = document.getElementById('editFile').files[0]

            $.get('/api/v1/auth/submitKey', (key) => {
                setTimeout(function () {
                    $.when(submitAsana(htmlBody, taskName, date, key, 0, writeEditsFile))
                        .then(() => {
                            weCont.style.display = 'none';
                            login.thankYou();
                        });
                }, 3000);
            });
        });
        //back button to original 6 choices
        document.getElementById('editBack').addEventListener('click', (e) => {
            e.preventDefault();
            //hide the current section
            weCont.style.display = 'none';
            writingHex();
        });

        weCont.style.display = 'block';
        //changes progress bar to current progress
        document.getElementById('writeBar').style.width = '100%';
    }

    function writeOther() {
        let woCont = document.getElementById('writeCont7');


        document.getElementById('otherNext1').addEventListener('click', (e) => {
            e.preventDefault();
            woCont.style.display = 'none';
            writeSubmitOther();
        });

        document.getElementById('otherBack1').addEventListener('click', (e) => {
            e.preventDefault();
            woCont.style.display = 'none';
            writingHex();
        });
        woCont.style.display = 'flex';
        //changes progress bar to current progress
        document.getElementById('writeBar').style.width = '75%';
    }

    function writeSubmitOther() {
        let wsoCont = document.getElementById('writeCont8');
        $('#writingDeliveryDate').daterangepicker({
            "singleDatePicker": true,
            "startDate": now,
        });

        $("#eventForm1").submit(function (event) {
            event.preventDefault();
            //load error and loading
            var gifLoc = document.getElementById('otherSubmitLoad');
            var gifLoading = document.getElementById('otherSubmitLoading');
            var errorNotif = document.getElementById('otherSubmitError');
            showDiv(gifLoc, gifLoading, errorNotif);
            var sbmtdEvent = objectifyForm($(this).serializeArray()); // serialize form and convert to object
            clean(sbmtdEvent);
            //sets task name in Asana
            var date = sbmtdEvent["writingDeliveryDate"];
            var taskName = sbmtdEvent['writingProjectName'];

            //sets up obj => html to look nice in asana
            var htmlBody = putIntoHtml(sbmtdEvent);
            var writeSubmitOtherFile = document.getElementById('wFile').files[0];

            //submitted to asana
            $.get('/api/v1/auth/submitKey', (key) => {
                setTimeout(function () {
                    $.when(submitAsana(htmlBody, taskName, date, key, 0, writeSubmitOtherFile))
                        .then(() => {
                            wsoCont.style.display = 'none';
                            login.thankYou();
                        });
                }, 3000);
            });
        });
        //sends you back to original 6 options
        document.getElementById('otherBack2').addEventListener('click', (e) => {
            e.preventDefault();
            wsoCont.style.display = 'none';
            writeOther();
        });
        //init
        wsoCont.style.display = 'block';
        //changes progress bar to current progress
        document.getElementById('writeBar').style.width = '100%';
    }

    //init
    writingHex();
}

//////////tools////////////

//deletes empty obj
function clean(obj) {
    for (var propName in obj) {
        if (obj[propName] === null || obj[propName] === undefined || obj[propName] === "" || obj[propName] === "0" || obj[propName] === 0) {
            delete obj[propName];
        }

    }
}
//grabs form to obj
function objectifyForm(formArray) { //serialize data function

    var returnArray = {};
    for (var i = 0; i < formArray.length; i++) {
        returnArray[formArray[i]['name']] = formArray[i]['value'];
    }
    return returnArray;

}
//validates content within modal
function modalValidation() {

    document.getElementById('nameButton').addEventListener('click', (e) => {
        e.preventDefault();
        validateName();

    });
    $(document).keypress(function (e) {
        var keycode = (e.keyCode ? e.keyCode : e.which);
        if (keycode == '13') {
            e.preventDefault();
            validateName();
        }
    });
}
//validates name within modal
function validateName() {
    var x = document.forms["eventForm1"]["firstandLastName"].value;
    var nameInput = document.getElementById('firstandLastName');
    var parentEl = nameInput.parentElement;
    var errAlert = document.createElement('p');
    if (x == "") {
        console.log(nameInput);

        errAlert.innerHTML = 'Please Fill Out Your Name';
        errAlert.classList.add("fillerror");
        parentEl.appendChild(errAlert);
        return false;
    } else {
        errAlert.classList.add("fixed");
        validateEmail();
    }
}
//validates there's content within modal
function validateEmail() {
    var x = document.forms["eventForm1"]["emailAddy"].value;
    var emailInput = document.getElementById('emailAddy');
    var parentEl = emailInput.parentElement;
    var errAlert = document.createElement('p');
    var verified = emailIsValid(x);


    if (verified == false) {
        errAlert.innerHTML = 'Please Enter A Valid Email';
        errAlert.classList.add("fillerror");
        parentEl.appendChild(errAlert);
        return false;
    } else {
        errAlert.classList.add("fixed");
        $('#nameModal').modal('hide');

    }
}

function emailIsValid(x) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(x)
}

//sets up loading gif
function showDiv(gifLoc, gifLoading, errorNotif) {
    //gets the ID to continue functions
    gifLoc.style.display = "block";
    gifLoading.style.display = 'block';
    errorNotif.style.display = "none";
    setTimeout(function () {
        gifLoading.style.display = 'none';
        errorNotif.style.display = "block";
    }, 15000);
}

//puts form from obj to clean html list
function putIntoHtml(theForm) {
    var liItems = " ";
    var x;
    for (x in theForm) {
        liItems += "<li>" + x + ":" + theForm[x] + "</li>";
    }
    var htmlBody = "<body><ul>" + liItems + "</ul></body>";

    return htmlBody;
}
//add button for event section
$('.addBtn').click(function (event) {
    event.preventDefault();
    $(this).prev().val(+$(this).prev().val() + 1);
});
//subtract button in event section
$('.subBtn').click(function (event) {
    event.preventDefault();
    if ($(this).next().val() > 0) $(this).next().val(+$(this).next().val() - 1);
});
//submits form to asana and checks for attatchments
function submitAsana(obj, taskName, date, key, subtaskName, fileID) {
    console.log(fileID);
    
    var formattedDate = moment(date).format("YYYY-MM-DD");
    var bearerToken = "Bearer " + key;
    var workspace = "14274001406596"
    var projects = "803419057804355"
    var task = {
        data: {
            due_on: formattedDate,
            html_notes: obj,
            workspace: workspace,
            projects: [projects],
            name: taskName,
            // assignee: {
            //     id: 178011658698241,
            //     gid: "178011658698241",
            //     resource_type: "user"
            // }
        }
    }
    var options = {
        "method": "POST",
        "headers": {
            "Authorization": bearerToken,
            "Content-type": "application/json"
        },
        "body": JSON.stringify(task)
    }
    return new Promise(resolve => {
        fetch('https://app.asana.com/api/1.0/tasks/', options)
            .then((res) => {
                return res.json()
            })
            .then((data) => {
                var readable = JSON.stringify(data);
                var response = JSON.parse(readable);
                var taskID = response.data.id;
                if (isEmpty(fileID)) {
                    attachment(fileID, taskID, resolve, bearerToken, subtaskName);
                } else if (subtaskName != 0) {
                    subtask(subtaskName, taskID, bearerToken, resolve);
                } else {
                    resolve(taskID);
                }
            })
            .catch((err) => {
                console.log("didn't work");

            });
    });
};


//sends attachment
function attachment(file, taskID, resolve, bearerToken, subtaskName) {

    let data = new FormData();
    data.append("file", file);
    var url = 'https://app.asana.com/api/1.0/tasks/' + taskID + '/attachments';
    var options = {
        "method": "POST",
        "headers": {
            "Authorization": bearerToken,
        },
        "body": data
    }
    fetch(url, options)
        .then((res) => res.json())
        .then((stuff) => {
            if (subtaskName != 0) {
                subtask(subtaskName, taskID, bearerToken, resolve);

            } else {
                resolve(stuff);
            };
        }).catch((err) => {
            console.log(err);
        });
};
//adds subtask if there is a new choice within event checkbox section
function subtask(subtaskName, taskID, bearerToken, resolve) {

    var subtaskData = {
        data: {
            name: subtaskName,
        }
    }
    var otherOptions = {
        "method": "POST",
        "headers": {
            "Authorization": bearerToken,
        },
        "body": JSON.stringify(subtaskData)
    }
        fetch('https://app.asana.com/api/1.0/tasks/' + taskID + '/subtasks', otherOptions)
            .then((res) => res.json())
            .then((data) => {
                resolve(data);
            })
            .catch((err) => {
                console.log(err);
            })
};
//opens up thank you buttons and listens 
function thankYouPage() {
    let threeIntro = document.getElementById('thankyou');
    threeIntro.style.display = 'block';
    document.getElementById('submitted').style.display = 'block';
    document.getElementById('logOut').style.display = 'block';
    document.getElementById('startover').addEventListener('click', (e) => {
        e.preventDefault();
        return window.location.href = "/";
    });
    document.getElementById('logOut').addEventListener('click', (f) => {
        f.preventDefault();
        login.logout();
    });
}

$('#bootstrapForm').submit(function (event) {
    event.preventDefault()
    // var extraData = {}
    var form = $(this);
    $.ajax({
            type: 'POST',
            url: "https://docs.google.com/forms/d/e/1FAIpQLSdZx_mZzdj3gm6iDfK3Rk3YhfHDtGqmsz8GjN_Eu---uqP3BA/formResponse",
            data: form.serialize(),
            dataType: 'jsonp',
            error: function () {
                document.getElementById('bootstrapForm').style.display = 'none';
                document.getElementById('googleSubmit').classList.remove('d-none');
            }
        })
        .fail(() => {
            document.getElementById('bootstrapForm').style.display = 'none';
            document.getElementById('googleSubmit').classList.remove('d-none');
        });
});

const isEmpty = value =>
    value === undefined ||
    value === null ||
    (typeof value === 'object' && Object.keys(value).length === 0) ||
    (typeof value === 'string' && value.trim().length == 0);


//ajax call  
//going to url 
//firebase only

// save methods for later use
// class randomTools {
//     logItAll(x, y) {
//         sessionStorage.setItem(x, JSON.stringify(y));
//     };
//     getStorage(t) {
//         var getTheStrap = sessionStorage.getItem(t);
//         var stoStuff = JSON.parse(getTheStrap);
//         return stoStuff;
//     };
//     sendStorage(q, r) {
//         var currPayload = JSON.parse(sessionStorage.getItem(q));
//         let payload = {
//             ...currPayload,
//             ...r
//         };
//         this.logItAll(q, payload);
//     };
// }


var now = moment().format('MM/DD/YYYY');
let app = new App();
let login = new Auth();
window.onload = login.init();