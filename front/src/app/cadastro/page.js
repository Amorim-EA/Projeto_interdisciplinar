'use client'

import { useState } from 'react'
import style from '../page.module.css'
import { useRouter } from 'next/navigation'

export default function Cadastro() {

    const route = useRouter();
    const [titulo, setTitulo] = useState();
    const [data_cadastro, setData_Cadastro] = useState();
    const [preco, setPreco] = useState();
    const [imagem, setImagem] = useState();
    const [descricao, setDescricao] = useState();

    const cadastrar = (e) => {
        e.preventDefault()
        try {
            const produto = {
                titulo: titulo,
                data_cadastro: data_cadastro,
                preco: preco,
                imagem: imagem,
                descricao: descricao,
            }
    
            const produtoJson = JSON.stringify(produto);
    
            fetch("https://projeto-interdisciplinar-nine.vercel.app/produto", {
                method: "POST",
                headers: { "Content-Type": "Application/json" },
                body: produtoJson
            })
            route.push("/")
        } catch {
          console.error("Não foi possivel cadastrar!")
        }
    }
    return (
            <div className={style.containerC}>
            <form onSubmit={cadastrar} className={style.formulario}>
                <input placeholder='Informe o nome do produto' nome="titulo" type="text" className={style.input_padrao}
                    onChange={e => setTitulo(e.target.value)}></input>

                <input placeholder='Informe a data de cadastro' nome="data_cadastro" type="date" className={style.input_padrao}
                    onChange={e => setData_Cadastro(e.target.value)}></input>

                <input placeholder='Informe o preço' nome="preco" type="text" className={style.input_padrao}
                    onChange={e => setPreco(e.target.value)}></input>

                <input placeholder='Informe o URL da imagem' nome="imagem" type="text" className={style.input_padrao}
                    onChange={e => setImagem(e.target.value)}></input>

                <textarea placeholder='Faça uma breve descrição do produto' nome="descricao" type="text" className={style.text_area}
                    onChange={e => setDescricao(e.target.value)}
                    rows="5" cols="30"></textarea><br/>

                <div className={style.botoes}>
                    <button type='submit' className={style.botaoC}>Cadastrar</button>
                    <a href='/' className={style.linkV}>Voltar</a>
                </div>
            </form>
           </div>
    );

}
