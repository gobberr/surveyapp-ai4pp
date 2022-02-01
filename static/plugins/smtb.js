let access_token = localStorage.getItem('access_token')
let paramsHeader;
let email;
paramsHeader = {
  //"endpoint": "https://dev.dfil-tech.eu/smartweb", 
  "endpoint": "http://localhost:8082/scg", 
  //"endpoint": "https://gwapim.dfil-tech.eu/scg", 
  "owner": "Hera"    

}
/**
 * Include HTML contract snippet in the page under the template-contract div
 */
function includeHTML() {

    //paramsHeader = API.getParams();
    
    //console.log(paramsHeader)
    //func = API.getFunction();
    
    //console.log(paramsHeader)
    var z, i, elmnt, file, URLTEMPLATE, elmnts;

    
    /*loop through a collection of all HTML elements:*/
    z = document.getElementsByClassName("templateSM");    
    //console.log(z.length)
    if(z.length > 0) {
        //console.log("templateSM");
        elmnts=new Array(z.length);
        for (i = 0; i < z.length; i++) {
            elmnts[i] = z[i];  
            /*search for elements with a certain atrribute:*/
            id = elmnts[i].getAttribute("templateId");
            cid = elmnts[i].getAttribute("cid");
            //console.log('cid lib: ' +cid)
            //email = elmnts[i].getAttribute("email");
            if (id) {  
                xmlHttpRequest = new XMLHttpRequest();           
                
                URLTEMPLATE = paramsHeader.endpoint + '/' + paramsHeader.owner + '/templates/htmlform?id=' + id
                console.log(xmlHttpRequest)
                xmlHttpRequest.open('GET', URLTEMPLATE, true)
                xmlHttpRequest.setRequestHeader('Authorization', 'Bearer ' + access_token);
                
                new function (i) {  
                // note: the response handler must be inside of a closure so as to pass the value of i;  
                // otherwise, i would have the value from the last iteration of the loop, which would be n.  
                    xmlHttpRequest.onreadystatechange = function () {  
                        if (this.readyState === 4) { 
                            if (this.status == 200) {                              
                                var data = JSON.parse(this.response)
                                //data=JSON.parse(data)
                                elmnts[i].innerHTML = data.html;
                                //let signature_present = document.getElementById('signature_present')
                                //console.log(signature_present)
                                //signature_present.style.display = 'none'
                            } else {
                                elmnts[i].innerHTML = "Template non trovato.";
                            }
                            setTodayDate();
                        }
                    };  
                }(i);  
                xmlHttpRequest.send();  
            }
        }
    } else {
        z = document.getElementsByClassName("contractSM");        
        elmnts=new Array(z.length);
        //console.log("contractSM")
        
        for (i = 0; i < z.length; i++) {
            elmnts[i] = z[i];  
            /*search for elements with a certain atrribute:*/
            templateId = elmnts[i].getAttribute("templateId");
            cid = elmnts[i].getAttribute("cid");
            email = elmnts[i].getAttribute("email");
            let contractVersion = elmnts[i].getAttribute("version");
            if (templateId) {  
                xmlHttpRequest = new XMLHttpRequest();        
                
                URLCONTRACT = paramsHeader.endpoint + '/' + paramsHeader.owner + '/contracts/' + templateId + '/' + cid + '/htmlform?version=' + contractVersion
                xmlHttpRequest.open('GET', URLCONTRACT, true)
                xmlHttpRequest.setRequestHeader('Authorization', 'Bearer ' + access_token);
                new function (i) {  
                // note: the response handler must be inside of a closure so as to pass the value of i;  
                // otherwise, i would have the value from the last iteration of the loop, which would be n.  
                    xmlHttpRequest.onreadystatechange = function () {  
                        if (this.readyState === 4) { 
                            if (this.status == 200) {  
                                var data = JSON.parse(this.response)
                                //data=JSON.parse(data)   
                                //insert contract artifact if contract has been deployed                 
                                if (data.address) {
                                    var address = "<p> address: " + data.address + "</p>";
                                    var name = "<p> name: " + data.name + "</p>";
                                    var transactionDate = "<p> transactionDate: " + data.transactionDate + "</p>";
                                    var transactionHash = "<p> transactionHash: " + data.transactionHash + "</p>";
                                    var deployedParams = address + name + transactionDate + transactionHash;
                                    elmnts[i].innerHTML = deployedParams + data.html;
                                } else if (data.html) {                                    
                                    elmnts[i].innerHTML = data.html;
                                }

                                let signature_present = document.getElementById('label')
                                //console.log(signature_present)
                                signature_present.style.display = 'none'
                                setTodayDate();
                            } else {
                                elmnts[i].innerHTML = "Contratto non trovato.";
                            }
                        }
                    };  
                }(i);  
                xmlHttpRequest.send();  
            }
        }
    } 
};

/**
 * Checks that an element has a non-empty `name` and `value` property.
 * @param  {Element} element  the element to check
 * @return {Bool}             true if the element is an input, false if not
 */
const isValidElement = element => {
    return element.id && element.value && element.tagName == "INPUT";
};


/**
 * Retrieves input data from a form and returns it as a JSON object.
 * @param  {HTMLFormControlsCollection} elements  the form elements
 * @return {Object}                               form data as an object literal
 */
const formToJSON = elements => [].reduce.call(elements, (data, element) => {

    if (isValidElement(element)) {
        switch (element.type) {
        case "number":
           data[element.id] = parseInt(element.value)
           break;
        /*case "file":              
            data[element.name] = element.file[0]
            break;*/
        case "hidden":          
           data[element.id] = element.value;

           break;
        case "text":
           data[element.id] = element.value
           break;
        case "date":
           data[element.id] = parseInt(element.value.replace(/\D/g, ''))
           break;

      }
    }
    return data;

}, {});

/**
 * generate today date 
 */
function setTodayDate() {
    let date = new Date(); 

    
    let field = document.querySelectorAll(".today")

    if(this.value == '' || this.value == this.defaultValue) {
        field.forEach(function(element){
            //console.log(element.id)
            element.value = date.getFullYear().toString() + '-' + (date.getMonth() + 1).toString().padStart(2, 0) + '-' + date.getDate().toString().padStart(2, 0);  
            //console.log(element.value)
            document.getElementById(element.id).readOnly = true;
            //console.log(element.readOnly)
        });           
    }
  }

/**
 * Post data for compiled template 
 * @param  {id} the template id
 * @param  {data} the input data
 * @return {Object}   
 */
function postData(id,data) {

  //paramsHeader = API.getParams();
  var url, xhr, params;
  var json = {}

  event.preventDefault();

  if(data.elements) {
      params = formToJSON(data.elements);

      json.params=params;
      json.templateid=id;

      // TEST DATA

      json['cid']=cid

      if(email)
        json['email']=email
      else
        json['email']= 'pippo@pluto.it' //default email 

      url = paramsHeader.endpoint + "/" + paramsHeader.owner + "/contracts"
      //console.log('postdata on ' + JSON.stringify(paramsHeader))
      xhr = new XMLHttpRequest();  
      
      xhr.open('POST', url);
      xhr.setRequestHeader('Content-Type', 'application/json');
      xhr.setRequestHeader('Authorization', 'Bearer ' + access_token);
      /*
      if(paramsHeader) {
        for(let i=0; i<paramsHeader.length; i++) {
          xhr.setRequestHeader(paramsHeader[i][0], paramsHeader[i][1])
        }
      }
      */

      xhr.onload = function() {
          if (xhr.status === 200) {
              //console.log(data);
              //data.getElementsByClassName("loading")[0].innerHTML = '';
              styleResultMessage(data.getElementsByTagName('output')[data.getElementsByTagName("output").length - 1],"Contratto salvato",false)
              data.getElementsByTagName("fieldset")[0].setAttribute("disabled", "disabled");
              data.getElementsByClassName("button")[0].setAttribute("type", "hidden");
          }
          else if (xhr.status !== 200) {
              //data.getElementsByClassName("loading")[0].innerHTML = '';
              data.getElementsByClassName("button")[0].setAttribute("type", "button");
              styleResultMessage(data.getElementsByTagName('output')[data.getElementsByTagName("output").length - 1],JSON.parse(xhr.responseText).error_description,true)
          }
      };
      xhr.onerror = function() {
          data.getElementsByTagName('output')[0].innerHTML = "Unknown Error Occured. Server response not received."
      }

      data.getElementsByClassName("button")[0].setAttribute("type", "hidden");
      //data.getElementsByClassName("loading")[0].innerHTML = '<img src="https://s3.gifyu.com/images/contract.gif" height="150px" width="150px" style="object-fit: contain; margin-left: auto; margin-right: auto;"</img>'
      xhr.send(JSON.stringify(json, null, "  "));
  }
  else{
      //console.log(data.elements)
  }
}

/**
 * Preview of the signture
 */
function previewFile(event) {

  var canvas = document.getElementById('canvas');
  var file = event.target.files[0];
  var reader = new FileReader();
  var ctx = canvas.getContext('2d');
  var image = new Image();
  image.onload = function() {
    ctx.drawImage(image, 0, 0, canvas.width, canvas.height);
  };
  
  reader.addEventListener("load", function () {
    image.src = reader.result;
    document.getElementById("signature").setAttribute('value', reader.result);  

  }, false);

  if (file) {
    reader.readAsDataURL(file);
  }
  
  var signatureList = document.getElementById("signature-image")
  signatureList.appendChild(image);
  if(signatureList.childNodes.length>1) {
    signatureList.removeChild(signatureList.childNodes[0]);
  }
}

/**
 * Convert file to base64
 */
function getBase64(file,callback) {
   var reader = new FileReader();
   reader.readAsDataURL(file);
   reader.onload = function () {
     callback(reader.result);
   };
   reader.onerror = function (error) {
     //console.log('Error: ', error);
     return null;
   };
}


function styleResultMessage(x,message,is_error) {
  x.style.display = "block";
  if(is_error){
    x.style.backgroundColor = "#FFD2D2";
    x.style.color = "#D8000C";   
  }
  else {
    x.style.backgroundColor = "#DFF2BF";
    x.style.color = "#4F8A10";
  }
  x.innerHTML = message;
}

/**
 *  update output label when input changed
 */
function updateLabel(id) {
  var text = document.getElementById(id).value; 
  var len = document.getElementsByName(id)
  for (let i=0; i<len.length; i++) {
    document.getElementsByName(id)[i].innerHTML = " <b>" + text + "</b> ";      
  }
}

includeHTML();
