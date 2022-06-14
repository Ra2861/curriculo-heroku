//alert("Bem-vindo ao meu curriculo")

function myFunction() {
    document.getElementById("myDropdown").classList.toggle("show");
  }

// menu
window.onclick = function(event) {
  if (!event.target.matches('.dropbtn')) {
    var dropdowns = document.getElementsByClassName("dropdown-content");
    var i;
    for (i = 0; i < dropdowns.length; i++) {
      var openDropdown = dropdowns[i];
      if (openDropdown.classList.contains('show')) {
        openDropdown.classList.remove('show');
      }
    }
  }
}

// painel descer e subir
$(document).ready(function(){
$("#flip").click(function(){
  $("#panel").slideDown("slow");
});
});

function funções() {
  linha();
}

function linha() {
  document.getElementById('texto').innerHTML = "Todos os projetos abaixo estão sendo retirados de um banco de dados"
}


function projetos () {
	let url = "/projetos";
 
	let xhttp = new XMLHttpRequest(); //método do HTML que permite que faça requisições por script
 
	xhttp.open("get", url, false) ; //abri a requisição do XMLHttpRequest com esses parâmetros. False é sobre ser síncrono, pois vai pegar só uma requisição. Se tivesse mais de uma poderia ser true (assíncrono)
 
	xhttp.send(); //manda para o servidor
 
	let data = JSON.parse(xhttp.responseText); 
	console.log(data[0]);
 
	$("#texto")[0].innerHTML = ''; 
 
	data.forEach(projetos => {   
	   
	   //acessa o 1º objeto da div 
	   $("#texto")[0].innerHTML += `
	   <td> ${projetos.nome} </td>
	   <td> ${projetos.descrição} </td>
	 </tr> 
	   ` 
	});
 
 
 
 
 
 
 
 
 
} 