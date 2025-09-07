let listas = [
    { descricao: 'Buscar Aurora na Escola as 12:20' },
    { descricao: 'Fazer compras no Mercado amanhã' },
];

const criarItensLista = (listas, botao) => {
    const lista = document.getElementById('lista');
    const toDo = document.createElement('li');

    toDo.appendChild(botao);
    lista.appendChild(toDo);
    
    return toDo;
}

const dataAtual = () => {

    const dataAtual = new Date();
    const dia = dataAtual.getDate();
    const mes = dataAtual.getMonth() + 1;
    const ano = dataAtual.getFullYear();

    const dataFormatada = `Criado em: ${dia}/${mes}/${ano}`;


    return dataFormatada;
};

let cont = 0;

const getInputBotao = ({ descricao }, index) => {
    const wrapper = document.createElement('div');
    const label = document.createElement('label');
    const btn = document.createElement('button');
    const btnOk = document.createElement('p');
    const data = document.createElement('span');
    
    data.textContent = dataAtual();

    btn.type = 'submit';
    btn.textContent = 'Concluir';
    btn.id = `btn-${index}`;

    label.textContent = descricao;
    label.htmlFor = `btn-${index}`;
    btn.addEventListener('click', function () {
        if (btnOk.style.display !== 'block') {
            label.style.textDecoration = 'line-through';
            btn.remove();
            btnOk.style.display = 'block';
            cont++;
        } else {
            label.style.textDecoration = '';
            btnOk.style.display = 'none';
            cont--;
        }

        const footerconclu = document.getElementById('footer-concluidas');
        footerconclu.textContent = `${cont} - Tarefa concluída`;
    });

    wrapper.className = 'inputBotao-label-container';

    wrapper.appendChild(label);
    wrapper.appendChild(data);
    wrapper.appendChild(btn);
    wrapper.appendChild(btnOk);

    return wrapper;
}

const getDadosNovaLista = (event) => {
    const descricao = event.target.elements.descricao.value;
    return { descricao };
}

const crearLista = (event) => {
    event.preventDefault();
    const DadosLista = getDadosNovaLista(event);

    const botao = getInputBotao(DadosLista, listas.length);
    criarItensLista(DadosLista, botao);
    listas.push(DadosLista);

    event.target.elements.descricao.value = '';
}

window.onload = function () {
    const formulario = document.getElementById('input-form');
    formulario.addEventListener('submit', crearLista);
    
    listas.forEach((listas, index) => {
        const botao = getInputBotao(listas, index);
        criarItensLista(listas, botao);
    });
}