// const myPromise = new Promise((resolve, reject) => {
//     setTimeout(() => {
//         console.log("Promise is running");
//         resolve(); 
//     }, 1000);
// });

// myPromise.then(() => {
   
// });

// const myPromiseReject = new Promise(resolve, reject)=>{
//     const success = false;
//     if(success){
//         resolve("Success");
//     }
//     else{
//         reject("something happened")
//     }
// }


//detyre - krijimi i promises checkPassword
// const checkPassword = new Promise((resolve, reject) => {
    
//     const password = "koditend123"; 
   
//     if (password.length > 6) {
      
//         resolve("Password is strong");
//     } 
//     else {
       
//         reject("Password is too short");
//     }
// });


// checkPassword
//     .then((message) => {
//         console.log(message); 
//     })
//     .catch((error) => {
//         console.log(error);   
//     });




function fetchData(){
    return new Promise((resolve, reject)=>{
        setTimeout(()=>{
            resolve("Promise is awaiting", 1000)
        })
    })
}

async function getData(){
    const result = await fetchData();
    console.log(result)
}

getData();