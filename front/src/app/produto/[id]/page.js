'use client'
import style from '../../page.module.css';
import Link from 'next/link';
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function VerMais({ params }) {
  const [produto, setProduto] = useState({
    titulo: "",
    data_cadastro: "",
    preco: "",
    imagem: "",
    descricao: ""
  });

  const router = useRouter()
  const { id } = params; 

  useEffect(() => {
    const fetchProduto = async () => {
      try {
        const response = await fetch(`http://192.168.15.73:3000/produto?id=${id}`);
        const produtoData = await response.json();
        setProduto(produtoData);
      } catch (error) {
        console.error("O produto não foram encontrados:", error); 
      }
    }
    fetchProduto();
  }, []);

  const remover = () => {
    try {
      fetch("http://192.168.15.73:3000/produto", {
        method: "DELETE",
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ id }) 
      });
      router.push("/");
    } catch (error) {
      alert("Ocorreu um erro" + error);
    }
  };

  return (
    <div className={style.containerV}>
      <div className={style.wrapper}>
        <img src={produto.imagem} alt="Imagem do produto" class={style.imgV} /> 
      <div className={style.informacao}>
        <h1 className={style.tituloV}>{produto.titulo}</h1>
        <p className={style.dataV}>{produto.data_cadastro}</p>
        <p className={style.precoV}>R${produto.preco}</p>
        <p className={style.descricao}>{produto.descricao}</p>
      </div>
    </div>

      <div className={style.botoes}>
        <button onClick={remover} className={style.botaoR}>Remover</button>
        <Link href='/' className={style.linkV}>Voltar</Link>
      </div>
    </div>
  );
}
