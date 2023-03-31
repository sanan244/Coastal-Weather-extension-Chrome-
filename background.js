importScripts('ExtPay.js') // or `import` / `require` if using a bundler

const extpay = ExtPay('socal-coastal-monitor')
extpay.startBackground(); 

function checkuser(content_){ 
    if(content_===null){content_="none"};
    extpay.getUser().then(user => {
    if (user.paid){
        // ...
        //console.log('user paid!')
        chrome.runtime.sendMessage({
            msg:"user_paid",
            data:{subject:"premium_approved",content:content_}
          });
          
    } else {
        // ...
        
        extpay.openPaymentPage();
            }
        }) 
    }

chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
        if(request.msg === "load_window"){
            
        }
        if (request.msg === "click") {
            //  To do something
            console.log("...premium button clicked.");
            checkuser();
        }
        if(request.msg === "dropdown_select"){
            //console.log("Background message received(content):", request.data.content)
            checkuser(request.data.content);

        }
    }
);
