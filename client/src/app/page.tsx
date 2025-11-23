import Image from "next/image";
import Link from "next/link";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import img from "../../public/image1.png";
export default function Home() {
  return (
    <div className="bg-white">
      <Header />

      <div className="relative w-full h-[695px]" id="home">
        <div className="absolute inset-0">
          <img
            src="https://vistapointe.net/images/restaurant-8.jpg"
            alt="Background Image"
            className="object-cover object-center w-full h-full"
          />
          <div className="absolute inset-0 bg-black/60"></div>
        </div>

        <div className="absolute inset-0 flex flex-col md:flex-row text-white items-center justify-between p-8 z-10">
          <div className="md:w-1/2 mb-4 md:mb-0">
            <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-4">
              Bienvenue chez{" "}
              <span className="text-[#c7a17a]">Webtech Restaurant</span>
            </h1>
            <p className="text-lg md:text-xl mb-8">
              Savourez une expérience culinaire authentique où la tradition
              rencontre la créativité.
            </p>
            <a
              href="#contactUs"
              className="px-6 py-3 bg-[#491904] text-white font-medium rounded-full hover:bg-[#c7a17a] transition duration-200"
            >
              Contacts
            </a>
          </div>
        </div>
      </div>

      <section className="mt-20" id="menu">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">
            NOS PLATS SPÉCIAUX
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <img
                src="https://marionadecouvert.com/wp-content/uploads/2014/11/marguery-ouv.jpg"
                alt="wheat flour grinding"
                className="w-full h-64 object-cover"
              />
              <div className="p-6 text-center">
                <h3 className="text-xl font-medium text-gray-800 mb-2">
                  Pain Maison
                </h3>
                <p className="text-gray-700 text-base">
                  Découvrez notre pain frais, cuit chaque jour avec passion et
                  des ingrédients de qualité.
                </p>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <img
                src="https://www.shbarcelona.fr/blog/fr/wp-content/uploads/2019/06/meal-918638_1280-1.jpg"
                alt="Coffee"
                className="w-full h-64 object-cover"
              />
              <div className="p-6 text-center">
                <h3 className="text-xl font-medium text-gray-800 mb-2">
                  Salades Fraîches
                </h3>
                <p className="text-gray-700 text-base">
                  Des salades colorées et gourmandes, préparées avec des légumes
                  frais et des assaisonnements savoureux.
                </p>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <img
                src="https://www.au-gre-des-sens.fr/wp-content/uploads/2020/05/Assiette-ve%CC%81ge%CC%81-scaled.jpg"
                alt="Coffee"
                className="w-full h-64 object-cover"
              />
              <div className="p-6 text-center">
                <h3 className="text-xl font-medium text-gray-800 mb-2">
                  Plats Végétariens
                </h3>
                <p className="text-gray-700 text-base">
                  Des plats créatifs et sains pour nos clients végétariens,
                  alliant saveurs et équilibre nutritionnel.
                </p>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <img
                src="https://lh4.googleusercontent.com/proxy/6LhvnWQ2dtIzW8Oz0wZzxCFOUyTtnZwS2SjaC0LGYyBuFcFq3_ZwaayRZH4cJxALghsj1FubSIPLQ3ZJJZYB0Ex_5srtE0LDW4Bn7moEHVEnNiapuYstzME"
                alt="Coffee"
                className="w-full h-64 object-cover"
              />
              <div className="p-6 text-center">
                <h3 className="text-xl font-medium text-gray-800 mb-2">
                  Piments Maison
                </h3>
                <p className="text-gray-700 text-base">
                  Nos piments sont préparés avec soin pour relever chaque plat
                  d’une saveur authentique et épicée.
                </p>
              </div>
            </div>

            <div className="bg-white rounded-lg bg-gradient-to-tr from-pink-300 to-blue-300 p-0.5 shadow-lg overflow-hidden min-h-full">
              <div className="text-center text-white font-medium">
                Plat Spécial
              </div>
              <img
                src="https://img.freepik.com/photos-gratuite/plat-poulet-table-restaurant_7939-3126.jpg?semt=ais_hybrid&w=740&q=80"
                alt="Coffee"
                className="w-full h-64 object-cover rounded-t-lg"
              />
              <div className="p-6 bg-white text-center rounded-b-lg md:min-h-full">
                <h3 className="text-xl font-medium text-gray-800 mb-2">
                  Poulet Rôti
                </h3>
                <p className="text-gray-700 text-base">
                  Notre spécialité : poulet rôti aux herbes, tendre et juteux,
                  servi avec des accompagnements savoureux.
                </p>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <img
                src="https://img.freepik.com/photos-premium/nombreux-plats-delicieux-differents-table-du-restaurant-gros-plan_128442-278.jpg"
                alt="papad"
                className="w-full h-64 object-cover"
              />
              <div className="p-6 text-center">
                <h3 className="text-xl font-medium text-gray-800 mb-2">
                  Desserts Maison
                </h3>
                <p className="text-gray-700 text-base">
                  Terminez votre repas en beauté avec nos desserts maison,
                  gourmands et raffinés.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-gray-100" id="aboutus">
        <div className="container mx-auto py-16 px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 items-center gap-8">
            <div className="max-w-lg">
              <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">
                À propos de nous
              </h2>
              <p className="mt-4 text-gray-600 text-lg">
                Bappa Restaurant vous propose une expérience culinaire
                exceptionnelle. Nous utilisons des ingrédients frais et de
                qualité pour créer des plats qui raviront vos papilles. Notre
                équipe passionnée est dédiée à vous offrir le meilleur service
                et des saveurs authentiques.
              </p>
            </div>
            <div className="mt-12 md:mt-0">
              <img
                src="https://media-cdn.tripadvisor.com/media/photo-m/1280/26/ac/0f/89/salle-restaurant-nuit.jpg"
                alt="About Us Image"
                className="object-cover rounded-lg shadow-md"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="text-gray-700 body-font mt-10">
        <div className="flex justify-center text-3xl font-bold text-gray-800 text-center">
          Pourquoi nous choisir ?
        </div>
        <div className="container px-5 py-12 mx-auto">
          <div className="flex flex-wrap text-center justify-center">
            <div className="p-4 md:w-1/4 sm:w-1/2">
              <div className="px-4 py-6 transform transition duration-500 hover:scale-110">
                <div className="flex justify-center">
                  <img
                    src="https://image3.jdomni.in/banner/13062021/58/97/7C/E53960D1295621EFCB5B13F335_1623567851299.png?output-format=webp"
                    className="w-32 mb-3 rounded-lg transition-transform transform scale-100 group-hover:scale-105"
                  />
                </div>
                <h2 className="title-font font-regular text-2xl text-gray-900">
                  Cuisine Authentique
                </h2>
              </div>
            </div>

            <div className="p-4 md:w-1/4 sm:w-1/2">
              <div className="px-4 py-6 transform transition duration-500 hover:scale-110">
                <div className="flex justify-center">
                  <img
                    src="https://image2.jdomni.in/banner/13062021/3E/57/E8/1D6E23DD7E12571705CAC761E7_1623567977295.png?output-format=webp"
                    className="w-32 mb-3 rounded-lg transition-transform transform scale-100 group-hover:scale-105"
                  />
                </div>
                <h2 className="title-font font-regular text-2xl text-gray-900">
                  Prix Raisonnables
                </h2>
              </div>
            </div>

            <div className="p-4 md:w-1/4 sm:w-1/2">
              <div className="px-4 py-6 transform transition duration-500 hover:scale-110">
                <div className="flex justify-center">
                  <img
                    src="https://image3.jdomni.in/banner/13062021/16/7E/7E/5A9920439E52EF309F27B43EEB_1623568010437.png?output-format=webp"
                    className="w-32 mb-3 rounded-lg transition-transform transform scale-100 group-hover:scale-105"
                  />
                </div>
                <h2 className="title-font font-regular text-2xl text-gray-900">
                  Service Rapide
                </h2>
              </div>
            </div>

            <div className="p-4 md:w-1/4 sm:w-1/2">
              <div className="px-4 py-6 transform transition duration-500 hover:scale-110">
                <div className="flex justify-center">
                  <img
                    src="https://image3.jdomni.in/banner/13062021/EB/99/EE/8B46027500E987A5142ECC1CE1_1623567959360.png?output-format=webp"
                    className="w-32 mb-3 rounded-lg transition-transform transform scale-100 group-hover:scale-105"
                  />
                </div>
                <h2 className="title-font font-regular text-2xl text-gray-900">
                  Expertise Culinaire
                </h2>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="text-gray-700 body-font" id="gallery">
        <div className="flex justify-center text-3xl font-bold text-gray-800 text-center py-10">
          Galerie
        </div>

        <div className="grid grid-cols-1 place-items-center sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
          <div className="group relative">
            <img
              src="https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w0NzEyNjZ8MHwxfHNlYXJj/aHw1fHxuYXR1cmV8ZW58MHwwfHx8MTY5NDA5OTcyOXww&ixlib=rb-4.0.3&q=80&w=1080"
              alt="Image 1"
              className="aspect-[2/3] h-80 object-cover rounded-lg transition-transform transform scale-100 group-hover:scale-105"
            />
          </div>

          <div className="group relative">
            <img
              src="https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w0NzEyNjZ8MHwxfHNlYXJj/aHw1fHxuYXR1cmV8ZW58MHwwfHx8MTY5NDA5OTcyOXww&ixlib=rb-4.0.3&q=80&w=1080"
              alt="Image 1"
              className="aspect-[2/3] h-80 object-cover rounded-lg transition-transform transform scale-100 group-hover:scale-105"
            />
          </div>

          <div className="group relative">
            <img
              src="https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w0NzEyNjZ8MHwxfHNlYXJj/aHw1fHxuYXR1cmV8ZW58MHwwfHx8MTY5NDA5OTcyOXww&ixlib=rb-4.0.3&q=80&w=1080"
              alt="Image 1"
              className="aspect-[2/3] h-80 object-cover rounded-lg transition-transform transform scale-100 group-hover:scale-105"
            />
          </div>
          <div className="group relative">
            <img
              src="https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w0NzEyNjZ8MHwxfHNlYXJj/aHw1fHxuYXR1cmV8ZW58MHwwfHx8MTY5NDA5OTcyOXww&ixlib=rb-4.0.3&q=80&w=1080"
              alt="Image 1"
              className="aspect-[2/3] h-80 object-cover rounded-lg transition-transform transform scale-100 group-hover:scale-105"
            />
          </div>
        </div>
      </section>

      <section className="bg-gray-100">
        <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:py-20 lg:px-8">
          <div className="max-w-2xl lg:max-w-4xl mx-auto text-center">
            <h2
              className="text-3xl font-extrabold text-gray-900"
              id="contactUs"
            >
              Visitez notre restaurant
            </h2>
            <p className="mt-3 text-lg text-gray-500">
              Nous serons ravis de vous accueillir et de vous faire découvrir
              nos spécialités.
            </p>
          </div>
          <div className="mt-8 lg:mt-20">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <div className="max-w-full mx-auto rounded-lg overflow-hidden">
                  <div className="border-t border-gray-200 px-6 py-4">
                    <h3 className="text-lg font-bold text-gray-900">Contact</h3>
                    <p className="mt-1 font-bold text-gray-600">
                      <a href="tel:+33">Téléphone: +33 753473804</a>
                    </p>
                    <a className="flex m-1" href="tel:+33753473804">
                      <div className="flex items-center justify-center h-10 w-30 rounded-md bg-indigo-500 text-white p-2">
                        Appeler maintenant
                      </div>
                    </a>
                  </div>
                  <div className="px-6 py-4">
                    <h3 className="text-lg font-medium text-gray-900">
                      Adresse
                    </h3>
                    <p className="mt-1 text-gray-600">
                      10 Rue Sextius Michel, 75015 Paris
                    </p>
                  </div>
                  <div className="border-t border-gray-200 px-6 py-4">
                    <h3 className="text-lg font-medium text-gray-900">
                      Horaires
                    </h3>
                    <p className="mt-1 text-gray-600">
                      Lundi - Dimanche : 14h - 21h
                    </p>
                  </div>
                </div>
              </div>
              <div className="rounded-lg overflow-hidden order-none sm:order-first">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3785.7850672491236!2d76.58802159999999!3d18.402630699999996!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bcf83ca88e84341%3A0x841e547bf3ad066d!2zQmFwcGEgZmxvdXIgbWlsbCB8IOCkrOCkquCljeCkquCkviDgpKrgpYDgpKAg4KSX4KS_4KSw4KSj4KWALCDgpK7gpL_gpLDgpJrgpYAg4KSV4KS-4KSC4KSh4KSqIOCkhuCko-CkvyDgpLbgpYfgpLXgpL7gpK_gpL4!5e0!3m2!1sen!2sin!4v1713433597892!5m2!1sen!2sin"
                  className="w-full"
                  width="600"
                  height="450"
                  loading="lazy"
                ></iframe>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
