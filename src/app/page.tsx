'use client';
import { useEffect, useRef, useState } from 'react';
import classNames from 'classnames';
import Image from 'next/image';
import Slider, { Settings } from 'react-slick';
import { PiHandWavingFill, PiPresentationChartBold } from 'react-icons/pi';
import { HiMenu, HiOutlineX } from 'react-icons/hi';
import { HiOutlineLightBulb } from 'react-icons/hi2';
import { MdOutlineHomeWork } from 'react-icons/md';
import { GoEye } from 'react-icons/go';
import { RiArrowRightCircleLine, RiArrowLeftCircleLine } from 'react-icons/ri';
import { FaFacebookF, FaTwitter, FaLinkedin, FaYoutube } from 'react-icons/fa';
import { AiFillInstagram } from 'react-icons/ai';
import { useMediaQuery } from 'react-responsive';
import { GrFormNext, GrFormPrevious } from 'react-icons/gr';
import { Navbar } from '@/components/Navbar/Navbar';

function Home() {
  const home = classNames(
    'flex min-h-screen flex-col items-center justify-center bg-white'
  );
  const [show, setShow] = useState(false);
  const sliderCommentRef = useRef<Slider>(null);
  // const mdScreen = useMediaQuery({ query: '(min-width: 1024)' })

  // useEffect(() => {
  //   console.log(mdScreen)
  // }, [mdScreen])

  const carouselSettings: Settings = {
    swipe: false,
    infinite: true,
    slidesToShow: 3,
    autoplay: true,
    speed: 3000,
    autoplaySpeed: 3000,
    cssEase: 'linear',
    pauseOnFocus: true,
    arrows: false,
  };

  const carouselSettings2: Settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 2,
    cssEase: 'linear',
    className: 'center',
    centerMode: true,
    centerPadding: '60px',
    dots: true,
    arrows: false,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          initialSlide: 1,
          infinite: true,
          dots: true,
        },
      },
    ],
  };

  const carouselSettings3 = {
    centerMode: true,
    classNames: 'center',
    slidesToShow: 3,
    slidesToScroll: 1,
    dots: true,
    infinite: true,
    cssEase: 'linear',
  };

  const menuRoute = [
    {
      label: 'Home',
      path: '/',
    },
    {
      label: 'Product',
      path: '/product',
    },
    {
      label: 'Resource',
      path: '/resource',
    },
    {
      label: 'Blog',
      path: '/blog',
    },
    {
      label: 'Contact Us',
      path: '/contact-us',
    },
  ];

  const products1 = [
    {
      name: 'Setapp',
      desc: 'Server management',
      logo: '/products/setapp-light-transparent.png',
    },
    {
      name: 'Gawe',
      desc: 'Server management',
      logo: '/products/gawe-light-transparent.png',
    },
    {
      name: 'Taktik',
      desc: 'Server management',
      logo: '/products/taktik-light-transparent.png',
    },
    {
      name: 'Linka',
      desc: 'Server management',
      logo: '/products/linka-light-transparent.png',
    },
    {
      name: 'Hashtag',
      desc: 'Server management',
      logo: '/products/hashtag-light-transparent.png',
    },
    {
      name: 'Dompet',
      desc: 'Server management',
      logo: '/products/banx-light-transparent.png',
    },
  ];

  const products2 = [
    {
      name: 'Eduka',
      desc: 'Server management',
      logo: '/products/eduka-light.png',
    },
    {
      name: 'Keepr',
      desc: 'Server management',
      logo: '/products/keepr-light.png',
    },
    {
      name: 'Paraf',
      desc: 'Server management',
      logo: '/products/paraf-light.png',
    },
    {
      name: 'Monito',
      desc: 'Server management',
      logo: '/products/monito-light.png',
    },
    {
      name: 'Uniq',
      desc: 'Server management',
      logo: '/products/uniq-light.png',
    },
    {
      name: 'Bambu',
      desc: 'Server management',
      logo: '/products/bambu-light.png',
    },
  ];

  return (
    <main className="flex align-middle min-h-screen flex-col bg-white">
      <Navbar route={menuRoute} />

      <section className="flex justify-center flex-col items-center gap-4 pt-10 px-[1em] md:px-[3em]">
        <div className="bg-[#CBE3FA66] flex p-4 rounded-full">
          <p className="text-sm mr-2">Hello Everyone</p>
          <PiHandWavingFill color="#FFCE47" size={20} />
        </div>
        <h1 className="font-jakarta font-bold text-6xl text-center">
          Solutions for all your needs
        </h1>
        <p className="max-w-[651px] text-center text-[#545454]">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua.
        </p>
        <button className="bg-black text-white text-md rounded-full p-4">
          Check Our Products
        </button>
        <div>
          <Image
            src="/webbg.png"
            alt="Info Image"
            width={2880}
            height={994}
            className="h-full w-full bg-gradient-to-b from-white via-black to-black"
          />
        </div>
      </section>

      <section>
        <Slider {...carouselSettings}>
          {Array.from({ length: 12 }, (_, i) => (
            <div key={i}>
              <div className="py-10 mx-3">
                <Image
                  src={`/company/img${i + 1}.png`}
                  alt={`logo ${i + 1}`}
                  width={400}
                  height={120}
                  className="mx-auto w-full h-full max-h-16"
                />
              </div>
            </div>
          ))}
        </Slider>
      </section>

      <section className="px-[1em] md:px-[3em]">
        <div className="flex justify-center flex-col items-center gap-4 py-16">
          <div className="bg-[#C4DFAA66] p-4 rounded-full">
            <p className="text-xs leading-[18px] font-medium">Benefits will you get</p>
          </div>
          <h1 className="font-jakarta font-bold text-5xl text-center">
            The advantage using our products
          </h1>
          <p className="max-w-[651px] text-center text-[#545454]">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </p>
        </div>
        <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-4 sm:px-[1em] md:px-[3em]">
          <div className="flex flex-col gap-4 items-center justify-center">
            <div className="bg-[#FFF4FC] rounded-3xl p-7">
              <HiOutlineLightBulb size={50} color="#FF65D5" />
            </div>
            <p className="text-xl font-bold font-jakarta">Usable to Easy</p>
            <p className="text-center text-[#545454]">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </p>
          </div>
          <div className="flex flex-col gap-4 items-center justify-center">
            <div className="bg-[#E9F5FF] rounded-3xl p-7">
              <MdOutlineHomeWork size={50} color="#008CFE" />
            </div>
            <p className="text-xl font-bold font-jakarta">Used Anyware</p>
            <p className="text-center text-[#545454]">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </p>
          </div>
          <div className="flex flex-col gap-4 items-center justify-center">
            <div className="bg-[#F0ECFF] rounded-3xl p-7">
              <PiPresentationChartBold size={50} color="#5C32FF" />
            </div>
            <p className="text-xl font-bold font-jakarta">Base Service</p>
            <p className="text-center text-[#545454]">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </p>
          </div>
          <div className="flex flex-col gap-4 items-center justify-center">
            <div className="bg-[#FFF5EE] rounded-3xl p-7">
              <GoEye size={50} color="#FE9143" />
            </div>
            <p className="text-xl font-bold font-jakarta">Transparency</p>
            <p className="text-center text-[#545454]">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </p>
          </div>
        </div>
      </section>

      <section className="px-[1em] md:px-[3em] lg:px-[82px] lg:py-[72px]">
        <div className="flex justify-center flex-col items-center gap-4 py-16">
          <div className="bg-[#C4DFAA66] p-4 rounded-full">
            <p className="text-xs leading-[18px] font-medium">Our Products</p>
          </div>
          <h1 className="font-jakarta font-bold text-5xl text-center">
            Choose the product that suits your needs
          </h1>
          <p className="max-w-[651px] text-center text-[#545454]">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </p>
        </div>
        <div className="flex flex-col md:flex-row gap-0 md:gap-8 px-[1em] md:px-[3em]">
          <div className="flex-1 flex flex-col">
            {products1.flatMap((product, key) => (
              <div className="flex flex-row" key={`${product.name}-${key}`}>
                <Image
                  src={product.logo}
                  alt="logo"
                  width={512}
                  height={512}
                  className="m-2 w-16 h-16"
                />
                <div className="flex flex-col justify-center flex-2 grow">
                  <h3 className="font-jakarta font-bold text-2xl text-left">
                    {product.name}
                  </h3>
                  <p className="max-w-[651px] text-left text-[#545454] text-base">
                    {product.desc}
                  </p>
                </div>
                <button className="text-[#545454] text-base justify-self-end">
                  Visit Site
                </button>
              </div>
            ))}
          </div>
          <div className="flex-1 flex flex-col">
            {products2.flatMap((product, key) => (
              <div className="flex flex-row" key={`${product.name}-${key}`}>
                <Image
                  src={product.logo}
                  alt="logo"
                  width={512}
                  height={512}
                  className="m-2 w-16 h-16"
                />
                <div className="flex flex-col justify-center flex-2 grow">
                  <h3 className="font-jakarta font-bold text-2xl text-left">
                    {product.name}
                  </h3>
                  <p className="max-w-[651px] text-left text-[#545454] text-base">
                    {product.desc}
                  </p>
                </div>
                <button className="text-[#585966] text-base justify-self-end">
                  Visit Site
                </button>
              </div>
            ))}
          </div>
        </div>
        <div className="flex justify-center items-center py-10">
          <button className="bg-black text-white text-md rounded-full p-4">
            View all products
          </button>
        </div>
      </section>

      <section className="px-[1em] md:px-[3em] lg:px-[82px] lg:py-[72px]">
        <div className="flex justify-center flex-col items-center gap-4 py-16">
          <div className="bg-[#BDE2FF] p-4 rounded-full">
            <p className="text-xs leading-[18px] font-medium">Testimonials</p>
          </div>
          <h1 className="font-jakarta font-bold text-5xl text-center">
            They said about our products
          </h1>
          <p className="max-w-[651px] text-center text-[#545454]">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </p>
        </div>

        <div className="relative">
          <button
            className="bg-gradient-to-r from-white to-transparent absolute z-[3] h-full w-[7rem] flex items-center justify-center"
            onClick={() => sliderCommentRef.current?.slickPrev()}
          >
            {/* <button className='absolute z-[3] top-[50%] left-3'>Prev</button> */}
            <GrFormPrevious size={30} />
          </button>
          <Slider {...carouselSettings2} ref={sliderCommentRef}>
            {Array.from({ length: 11 }, (_, i) => (
              <div key={i}>
                <div className="m-2 p-3 shadow rounded-lg max-h-[12rem]">
                  <h5 className="line-clamp-4 italic font-normal text-sm">
                    A game-changer for my business. Thank you for your
                    expertise! The guidance and strategies provided by this team
                    have transformed my business into a thriving success.
                  </h5>
                  <div className="py-2 flex gap-2 items-center">
                    <img
                      src="https://source.unsplash.com/random/500x500/?close-up-model"
                      alt="profile"
                      width={500}
                      height={500}
                      className="rounded-full w-9 h-9"
                    />
                    <div>
                      <h5 className="font-jakarta font-bold text-lg">
                        Bojack Horse
                      </h5>
                      <h6 className="font-normal color-[#6E6E6E] text-base">
                        Full Stack Developer
                      </h6>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </Slider>
          <button
            className="bg-gradient-to-r from-transparent to-white absolute z-[3] h-full w-[7rem] right-0 top-0 flex items-center justify-center"
            onClick={() => sliderCommentRef.current?.slickNext()}
          >
            {/* <button className='absolute z-[3] top-[50%] left-3'>Prev</button> */}
            <GrFormNext size={30} />
          </button>
        </div>
      </section>

      <section className="px-[1em] md:px-[3em] lg:px-[82px] lg:py-[72px]">
        <div className="flex justify-center flex-col items-center gap-4 py-16">
          <div className="bg-[#FFEAEA] p-4 rounded-full">
            <p className="text-xs leading-[18px] font-medium">Blog</p>
          </div>
          <h1 className="font-jakarta font-bold text-5xl text-center">
            Keep updating news about us
          </h1>
          <p className="max-w-[651px] text-center text-[#545454]">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </p>
        </div>
        <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-4 px-[1em] md:px-[3em]">
          <div>
            <div className="rounded-3xl mb-5">
              <Image
                src="/bg-blog.png"
                alt="blog1"
                width={295}
                height={177}
                className="w-full"
              />
            </div>
            <p className="text-xl font-bold font-jakarta mb-3">
              Lorem ipsum dolor sit amet consectetur
            </p>
            <p className="text-left text-[#545454] line-clamp-2 mb-2">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </p>
            <a href="#" className="text-[#004E99] font-normal">
              Read More
            </a>
          </div>
          <div>
            <div className="rounded-3xl mb-5">
              <Image
                src="/bg-blog.png"
                alt="blog1"
                width={295}
                height={177}
                className="w-full"
              />
            </div>
            <p className="text-xl font-bold font-jakarta mb-3">
              Lorem ipsum dolor sit amet consectetur
            </p>
            <p className="text-left text-[#545454] line-clamp-2 mb-2">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </p>
            <a href="#" className="text-[#004E99] font-normal">
              Read More
            </a>
          </div>
          <div>
            <div className="rounded-3xl mb-5">
              <Image
                src="/bg-blog.png"
                alt="blog1"
                width={295}
                height={177}
                className="w-full"
              />
            </div>
            <p className="text-xl font-bold font-jakarta mb-3">
              Lorem ipsum dolor sit amet consectetur
            </p>
            <p className="text-left text-[#545454] line-clamp-2 mb-2">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </p>
            <a href="#" className="text-[#004E99] font-normal">
              Read More
            </a>
          </div>
          <div>
            <div className="rounded-3xl mb-5">
              <Image
                src="/bg-blog.png"
                alt="blog1"
                width={295}
                height={177}
                className="w-full"
              />
            </div>
            <p className="text-xl font-bold font-jakarta mb-3">
              Lorem ipsum dolor sit amet consectetur
            </p>
            <p className="text-left text-[#545454] line-clamp-2 mb-2">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </p>
            <a href="#" className="text-[#004E99] font-normal">
              Read More
            </a>
          </div>
        </div>
      </section>

      <section className="px-[1em] md:px-[3em] lg:px-[394px] lg:py-[72px]">
        <div className="flex justify-center flex-col items-center gap-2 py-16">
          <h1 className="font-jakarta font-bold text-5xl text-center">
            Subscribe to get newsletter
          </h1>
          <p className="max-w-[651px] text-center text-[#545454]">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </p>
          <div className="flex gap-5 flex-col md:flex-row py-10 px-[1em] w-full justify-center">
            <input
              type="text"
              className="p-4 border-2 border-[#e5e7eb] rounded-full w-full md:w-96"
              placeholder="Your Email"
            />
            <input
              type="button"
              value="Subscribe"
              className="bg-black text-white text-md rounded-full p-4 px-7"
            />
          </div>
        </div>
      </section>

      <footer className="px-[1em] md:px-[3em] flex flex-col p-20 gap-10">
        <div className="flex flex-col md:flex-row gap-10">
          <div className="flex flex-col gap-5 flex-1">
            <Image
              src="/logo-gray.svg"
              alt="Logo"
              width={0}
              height={0}
              className="w-20"
            />
            <p className="max-w-[388px] text-left text-[#545454]">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </p>
            <div className="flex gap-5">
              <FaFacebookF size={20} color="#272727" />
              <FaTwitter size={20} color="#272727" />
              <AiFillInstagram size={20} color="#272727" />
              <FaLinkedin size={20} color="#272727" />
              <FaYoutube size={20} color="#272727" />
            </div>
          </div>
          <div className="flex flex-col gap-10 sm:flex-row sm:gap-28 flex-1">
            <div className="flex flex-col gap-5">
              <h4 className="font-jakarta text-lg font-bold">Products</h4>
              <p className="text-base">Setapp</p>
              <p className="text-base">Gawe</p>
              <p className="text-base">Eduka</p>
              <p className="text-base">Monita</p>
              <p className="text-base">Linka</p>
              <p className="text-base">Outlet</p>
            </div>
            <div className="flex flex-col gap-5">
              <h4 className="font-jakarta text-lg font-bold">Company</h4>
              <p className="text-base">About Us</p>
              <p className="text-base">Career</p>
              <p className="text-base">Brand</p>
              <p className="text-base">Contact Us</p>
            </div>
            <div className="flex flex-col gap-5">
              <h4 className="font-jakarta text-lg font-bold">Resource</h4>
              <p className="text-base">Blog</p>
              <p className="text-base">Tutorials</p>
              <p className="text-base">Community</p>
              <p className="text-base">Events</p>
            </div>
          </div>
        </div>

        <div className="flex flex-row justify-center md:justify-between text-[#3F3F3F] w-full">
          <h5 className="text-base font-normal text-center">
            ©2023 Bina. All rights reserved{' '}
            <span className="inline-block md:hidden">
              Created by Creatif Studio
            </span>
          </h5>
          <h5 className="hidden md:block text-base font-normal">
            Created by Creatif Studio
          </h5>
        </div>
      </footer>
    </main>
  );
}

export default Home;

// export default function Home() {
//   return (
//     <main className="flex min-h-screen flex-col items-center justify-between p-24">
//       <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm lg:flex">
//         <p className="fixed left-0 top-0 flex w-full justify-center border-b border-gray-300 bg-gradient-to-b from-zinc-200 pb-6 pt-8 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit lg:static lg:w-auto  lg:rounded-xl lg:border lg:bg-gray-200 lg:p-4 lg:dark:bg-zinc-800/30">
//           Get started by editing&nbsp;
//           <code className="font-mono font-bold">src/app/page.tsx</code>
//         </p>
//         <div className="fixed bottom-0 left-0 flex h-48 w-full items-end justify-center bg-gradient-to-t from-white via-white dark:from-black dark:via-black lg:static lg:h-auto lg:w-auto lg:bg-none">
//           <a
//             className="pointer-events-none flex place-items-center gap-2 p-8 lg:pointer-events-auto lg:p-0"
//             href="https://vercel.com?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
//             target="_blank"
//             rel="noopener noreferrer"
//           >
//             By{' '}
//             <Image
//               src="/vercel.svg"
//               alt="Vercel Logo"
//               className="dark:invert"
//               width={100}
//               height={24}
//               priority
//             />
//           </a>
//         </div>
//       </div>

//       <div className="relative flex place-items-center before:absolute before:h-[300px] before:w-[480px] before:-translate-x-1/2 before:rounded-full before:bg-gradient-radial before:from-white before:to-transparent before:blur-2xl before:content-[''] after:absolute after:-z-20 after:h-[180px] after:w-[240px] after:translate-x-1/3 after:bg-gradient-conic after:from-sky-200 after:via-blue-200 after:blur-2xl after:content-[''] before:dark:bg-gradient-to-br before:dark:from-transparent before:dark:to-blue-700 before:dark:opacity-10 after:dark:from-sky-900 after:dark:via-[#0141ff] after:dark:opacity-40 before:lg:h-[360px] z-[-1]">
//         <Image
//           className="relative dark:drop-shadow-[0_0_0.3rem_#ffffff70] dark:invert"
//           src="/next.svg"
//           alt="Next.js Logo"
//           width={180}
//           height={37}
//           priority
//         />
//       </div>

//       <div className="mb-32 grid text-center lg:max-w-5xl lg:w-full lg:mb-0 lg:grid-cols-4 lg:text-left">
//         <a
//           href="https://nextjs.org/docs?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
//           className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           <h2 className={`mb-3 text-2xl font-semibold`}>
//             Docs{' '}
//             <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
//               -&gt;
//             </span>
//           </h2>
//           <p className={`m-0 max-w-[30ch] text-sm opacity-50`}>
//             Find in-depth information about Next.js features and API.
//           </p>
//         </a>

//         <a
//           href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
//           className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           <h2 className={`mb-3 text-2xl font-semibold`}>
//             Learn{' '}
//             <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
//               -&gt;
//             </span>
//           </h2>
//           <p className={`m-0 max-w-[30ch] text-sm opacity-50`}>
//             Learn about Next.js in an interactive course with&nbsp;quizzes!
//           </p>
//         </a>

//         <a
//           href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
//           className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           <h2 className={`mb-3 text-2xl font-semibold`}>
//             Templates{' '}
//             <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
//               -&gt;
//             </span>
//           </h2>
//           <p className={`m-0 max-w-[30ch] text-sm opacity-50`}>
//             Explore starter templates for Next.js.
//           </p>
//         </a>

//         <a
//           href="https://vercel.com/new?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
//           className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           <h2 className={`mb-3 text-2xl font-semibold`}>
//             Deploy{' '}
//             <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
//               -&gt;
//             </span>
//           </h2>
//           <p className={`m-0 max-w-[30ch] text-sm opacity-50`}>
//             Instantly deploy your Next.js site to a shareable URL with Vercel.
//           </p>
//         </a>
//       </div>
//     </main>
//   )
// }
