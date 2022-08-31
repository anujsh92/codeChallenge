import type { GetServerSideProps, NextPage } from "next";
import Head from "next/head";
import useGetCart from "../src/hooks/useGetCart";
import useGetProducts from "../src/hooks/useGetProducts";
import styles from "../styles/Home.module.css";

const Home: NextPage = () => {
  
    const products = useGetProducts();
    const cart = useGetCart();
    const formattedPrice = new Intl.NumberFormat('de-DE', {
        style: 'currency',
        currency: 'EUR',
      });
    const productsElements = products.data?.edges
    .map(({node}) => {

      return (
        <div className={styles.product} onClick={()=>{}}>
        <div className={styles.imagebox}>
            <img src={node.image} alt={""} width={175}/>
        </div>
        <div className={styles.textbox}>
        <h2 className={styles.item}>{node.name}</h2>
        <h3 className={styles.price}>{formattedPrice.format(node.prices.basePrice)}</h3>
            <p className={styles.baseunit}><label for="item-1-quantity">Base Unit:</label><span>{node.units[0].name}</span></p>
            
            <button  onClick={()=>{}} type="button" id="item-1-button">Add to Cart</button>
        </div>
        </div>
      );
    })

    return (
        <div className={styles.container}>
            <Head>
                <title>Bringmeister Coding Challenge</title>
            </Head>

            <h1>Cart</h1>
            <pre>{JSON.stringify(cart.data?.products.length, null, 4)}</pre>

            <h1>Product</h1>
            <div className={styles.listingsection}>{productsElements}</div>
            <pre>{JSON.stringify(products.data?.pageInfo.totalCount, null, 4)}</pre>
        </div>
    );
};
export default Home;
