const input_buscar = document.getElementById("buscar");

var pessoas = []

async function getValoresAPI(cep) {
  try {
    const response = await fetch("http://localhost:3000/get");

    console.log("Oi");
    if (!response.ok) {
      alert("Erro ao pegar Dados");
    }

    const data = await response.json();
    
    console.log("aq", data[0]);

    return data;
  } catch {
    return 0;
  }
}


function addElemento(index, item){
  const container = document.getElementById("cards-container");
  
  const card = document.createElement("div");
  card.className = "card";
  card.style = "width: 18rem; margin: 10px;";
  card.id = `card-${item.id}`;

  const cardBody = document.createElement("div");
  cardBody.className = "card-body";

  const title = document.createElement("h5");
  title.className = "card-title";
  title.textContent = item.nome || "Nome não disponível";  // Garantir que o nome seja mostrado

  const subtitle = document.createElement("h6");
  subtitle.className = "card-subtitle mb-2 text-body-secondary";
  subtitle.textContent = item.email || "Email não disponível"; // Garantir que o email seja mostrado

  const idade = document.createElement("p");
  idade.className = "card-text";
  idade.textContent = "Idade: " + (item.idade || "não disponível");

  const prof = document.createElement("p");
  prof.className = "card-text";
  prof.textContent = "Profissão: " + (item.profissao || "não disponível");

  cardBody.appendChild(title);
  cardBody.appendChild(subtitle);
  cardBody.appendChild(idade);
  cardBody.appendChild(prof);

  card.appendChild(cardBody);
  container.appendChild(card);
}

async function carregaAntigos(){
    const antigos = await getValoresAPI();

    const arr = antigos || [];

    for (let i = 0; i < arr.length; i++) {
      addElemento(i, arr[i]);
    }
  
}


input_buscar.addEventListener('input', async () => {
    const value = input_buscar.value.toLowerCase();
    
    let arr = [];

    const container = document.getElementById("cards-container");
    container.innerHTML = "";


    dados = await getValoresAPI();

    for(let i = 0; i < dados.length; i++){

        if(dados[i].nome.toLowerCase().includes(value.toLowerCase())){
            arr.push({valores: dados[i], index: i});
        }
    }
    

    for(let i = 0; i < arr.length; i++){

        console.log(arr[i])

        addElemento(arr[i].index, arr[i].valores);
    }

    
  });


window.onload = carregaAntigos;