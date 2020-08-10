   //Seleccion de elementos globales
   //<?php phpinfo();

   let menu = document.querySelector(".material-icons")
   let drawer = document.querySelector("#drawer")
   let links = document.querySelectorAll("a")
   let loader = document.querySelector("img")
   
   let tempReal=location.pathname.split('/')[1]


    if (loader.complete) {//------------Primer Ajax para la Primera pagina por defecto
        ajax("home.html","get",function(dataRecibedOfCallBackAjax){
                insertarInformacion("main",dataRecibedOfCallBackAjax)
        },true)
    }else{
        loader.addEventListener("load",function(e){
            console.log("Loaded!")
        })
    }

          

   //Animacion del drawer
   menu.addEventListener("click",function(e){
       if (drawer.style.left) {
           drawer.style.left = ''
       }else{
           drawer.style.left = '0px'
       }
   })
    //1) Modificar el callback de los clicks de cada link para que ademas SE CREE un nuevo punto 
   //en el historial del usuario usando el texto de cada link como nueva url
   //Pedidos de ajax
   //-------------------------solicitudes por AJAX diferentes a los Default
  



    //---------------------------------//Ajax
    function ajax(url,metodo,callback) {
                xhr=new XMLHttpRequest();
                xhr.open(metodo,url)

                        xhr.addEventListener('load',function (e) { 
                                if(xhr.status == 200){
                                    callback(xhr.response)
                                }

                         })

                xhr.send()      
                return xhr          

      }
  
    //--------------------------------Funcion para insertar informacion
   function insertarInformacion(tagElegido,informacionInsertable){
       document.querySelector(tagElegido).innerHTML = informacionInsertable
   }



   //Estos Click Cargan los history pero no su funcionalidad
    //Con lo cual con esto tendremos disponible window.location.pathname con la URL del paso anterior
      //esto permitira poder enviar el patchname como parametro y solicitar el Response
   links.forEach(x => x.addEventListener('click',function(e){
    e.preventDefault();

    //El ID coincide con la pagina por ende puedo sacarlo desde ahi
    let ubicacion=e.target.href;
        //Llamamos al ajax
        let xhr=ajax(ubicacion,"GET",function(dataRecibedOfCallBackAjax){
                        insertarInformacion('main',dataRecibedOfCallBackAjax)
                        
                });
            //Cuando termianmos con la llamada del ajax guardamos el estado
            xhr.addEventListener("load",()=>{
                //Si la respuesta fue exitosa la agregamos al historial
                    if(xhr.status == 200){
                            window.history.pushState(
                                    {   //Almaceno la pagina en el cache
                                        template : xhr.response
                                    },
                                    "",
                                    ubicacion)
                    }
                    portafolioLoad()
            })




             
}));

        //el popState maneja las flechas del navegador
            //Necesitamos previamente en el pushState cargar los estados y luego hacemos el eveno POPSTATE
window.addEventListener("popstate",(e)=> { 
    let urlUbicacion=location.pathname.split("/")[1] //esto me devuelve un array["/","resto"]
   
        //Verificamos si el archivo no esta en cache
            //e.state es el Objeto que pushimos con windows y tiene sus propiedades
            if(e.state.template){
                    console.log(urlUbicacion)
                    insertarInformacion('main',e.state.template)
            }else{
                    //Esta Url me permite llamar al AJAX y solicitar ese archivo
                    ajax(urlUbicacion,"GET",function(callbackRecibido){
                        //La informacion que me devuelve la CALLBACK del AJAX entra como parametro para la funcion anonima y ese PARAMETRO se lo envio a la funcion
                            //InsertarInformacion
                                insertarInformacion("main",callbackRecibido)

                            
                             
                    })

            }


                   
    //console.log("Cambiando el historial con las flechas")  
})
  

function portafolioLoad(){
            

        let articulos = document.querySelectorAll("article")
        if(articulos.length){


            articulos.forEach(valores => {

                    let nuevoAjax=new XMLHttpRequest();
                    nuevoAjax.open('GET',"https://dog.ceo/api/breeds/image/random")

                    nuevoAjax.addEventListener('load',function(e) {
                        e.preventDefault()
                            let valor= nuevoAjax.response
                            
                            let objetoParseado = JSON.parse(valor)
                            let url = objetoParseado.message
                            let img = document.createElement("img")
                            img.src = url
                            valores.children[0].appendChild(img)
                    })

                    nuevoAjax.send(null)
            
            });

        } 
    
        //--------------------
        let item=document.querySelector('#listado');
    
        if(item){   
                        
                    let ajaxs=new XMLHttpRequest()
                    ajaxs.open('GET',"listado.html")

                            ajaxs.addEventListener('load',function () {
                                    if(ajaxs.status==200){
                                        let div=document.createElement('div')
                                        div.innerHTML=ajaxs.response
                                        item.appendChild(div)  
                                    
                                    }
                                
                            })

                    ajaxs.send(null)
                
        }

        let traduccion=document.querySelector('#traduccion')
        if(traduccion){   
                        
            let ajaxs2=new XMLHttpRequest()
            ajaxs2.open('GET',"traduccion.html")

                    ajaxs2.addEventListener('load',function () {
                            if(ajaxs2.status==200){
                                let div=document.createElement('div')
                                div.innerHTML=ajaxs2.response
                                traduccion.appendChild(div)  
                            
                            }
                        
                    })

            ajaxs2.send(null)
        
        }





        
       
       

            document.addEventListener('click',function(e){ 
                let info;
                    //Chequeo si el TagName es Button
                    if(e.target.tagName.toLowerCase() == 'button'){
                        //Se lo asignamos a la variable
                        info=e.target
                    }

                    //si tiene valor info entonces hacemos lo siguiente
                    if(info){
                            //Peticion por AJAX
                            let ajaxs3=new XMLHttpRequest();    
                            ajaxs3.open('GET',"https://jsonplaceholder.typicode.com/users")

                                    //Cuando ajax haya terminado hacemos lo siguiente
                                    ajaxs3.addEventListener('load',()=>{
                                        if(ajaxs3.status==200){                                              
                                                console.log("Correcto")
                                        }
                                    })

                            ajaxs3.send(null)

                            let boton=document.getElementById('usuarios')
                                    boton.addEventListener('click',()=>{
                                        //console.log(ajaxs3.response)
                                        let dataParseada=JSON.parse(ajaxs3.response)

                                            //Creo un fragmento donde almacenar todos los LI y
                                            //Despues los envio al UL
                                            let fragamento= document.createDocumentFragment()

                                            //Recorremos todos los elementos del Objeto JSON    //Simil Length
                                            dataParseada.forEach(elementos=>{
                                                    //ELEMENTOS ES EL PARAMETRO RECIBIDO CON EL QUE TENDREMOS
                                                    //QUE HACER LAS CONSULTAS //
                                                    //ELEMENTOS= MI ISNTRUMENTO DE MANIPULACION

                                                    let li=document.createElement('li')
                                                    li.innerText=elementos.name;
                                                    fragamento.appendChild(li)

                                            })

                                            //Enviamos ale fragmento al UL

                                            document.querySelector('#listado-usuarios').appendChild(fragamento);     

                                    })

                    }
                     
            })
       
  
        

        
 
  
}
                   


            
   

