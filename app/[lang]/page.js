import { getDictionary } from '../dictionaries/config.js';
import HomeClient from '../components/HomeClient.jsx';

export default async function HomePage({ params }) {
  const { lang } = await params;
  const d = getDictionary(lang);
  return <HomeClient d={d.home} common={d.common} lang={lang} />;
}
