import type { NextPage } from 'next';

import { Layout } from '../components/layout/Layout';
import { About } from '../components/organisms/About';
import { Portfolio } from '../components/organisms/Portfolio';
import { Works } from '../components/organisms/Works';

const Home: NextPage = () => {
  return (
    <Layout>
      <Portfolio />
      <About />
      <Works />
    </Layout>
  );
};

export default Home;
