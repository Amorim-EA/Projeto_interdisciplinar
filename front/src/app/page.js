'use client'
import style from './page.module.css';
import Link from 'next/link';
import { useEffect, useState } from 'react';
export default function Home() {
  const [produtos, setProdutos] = useState([]);

  useEffect(() => {
    async function fetchProdutos() {
      try {
        const response = await fetch("https://projeto-interdisciplinar-nine.vercel.app/produtos", {
          cache: "no-cache",
        });
        const produtosData = await response.json();
        setProdutos(produtosData);
      } catch (error) {
        console.error("Erro ao buscar produtos:", error);
      }
    }
    fetchProdutos();
  }, []);

  return (
    <div className={style.containerP}>
      {produtos.map(item => (
        <div className={style.card} key={item.id}>
          <img src={`${item.imagem}`} className={style.imgC} alt={item.titulo} />
          <p className={style.tituloC}>{item.titulo}</p>
          <p className={style.dataC}>{item.data_cadastro}</p>
          <p className={style.precoC}>{item.preco}</p>
          <div className={style.botoes}>
            <Link href={`/produto/${item.id}`} className={style.linkV}>ver mais</Link>
          </div>
        </div>
      ))}
    </div>
  );
}
