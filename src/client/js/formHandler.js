
function handleSubmit(event) {
    event.preventDefault()

    // check what text was put into the form field
    let userUrl = document.getElementById('name').value
    if(Client.checkForURL(userUrl)){
        alert("URL is valid")
    }else{
        alert("URL not Valid")
    }
    document.getElementById('submitBtn').addEventListener('click', async()=>{
        const apiKey= await getApiKey();
            getData(baseUrl,apiKey,userUrl)
        .then((data)=>{
            postData('http://localhost:8081/add',{
                model: data.model,
                score_tag: data.score_tag,
                agreement:data.agreement,
                subjectivity:data.subjectivity,
                confidence:data.confidence,
                irony:data.irony})
        }).then(()=>{
            updateUI();
        })
    });

    

}

const baseUrl="https://api.meaningcloud.com/sentiment-2.1?";
const getApiKey=async()=>{
    const response=await fetch('http://localhost:8081/key');
    const key= await response.text();
    return key;
}


const getData= async(baseUrl,apiKey,userUrl)=>{
    const apiUrl=`${baseUrl}&key=${apiKey}&url=${userUrl}&lang=en`;
    const response= await fetch(apiUrl);
    const data=await response.json();
    return data;
}

const postData= async(url,data={})=>{
    const response= await fetch(url,{
      method:'POST',
      credentials: 'same-origin',
      mode: 'cors',
      headers:{'Content-Type': 'application/json',},
      body:JSON.stringify(data)
    });
    try {
        // Transform into JSON
        const newData = await response.json();
               return newData
      }catch(error) {
      console.log("error", error);
      }
}

const updateUI= async()=>{
    const request= await fetch('http://localhost:8081/all')
    const data= await request.json();
    document.getElementById('model').innerHTML=`Model: ${data.model}`;
    document.getElementById('score_tag').innerHTML=`Score tag: ${data.score_tag}`;
    document.getElementById('agreement').innerHTML=`Agreement: ${data.agreement}`;

    document.getElementById('subjectivity').innerHTML=`subjectivity: ${data.subjectivity}`;
    document.getElementById('confidence').innerHTML=`confidence: ${data.confidence}`;
    document.getElementById('irony').innerHTML=`Irony: ${data.irony}`;

}


export { handleSubmit }
