import React from "react";
import Layout from "../layout";
import SEO from "../components/SEO/SEO";
import Hero from "../components/Hero/Hero";

export default class PostTemplate extends React.Component {
  render() {
    return (
      <Layout>
        <div>
          <h1 className="text-4xl text-center mb-6">Successful Payment</h1>
          <div className="max-w-screen-md text-center mx-auto mb-16">
            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. At culpa nulla veritatis beatae ullam quas repellendus praesentium corporis deserunt ab porro alias debitis voluptatum, dignissimos adipisci, dolor laborum minus hic!</p>
          </div>
        </div>
      </Layout>
    );
  }
}
