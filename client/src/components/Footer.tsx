import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white mt-20">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Nom du restaurant + Copyright */}
          <div className="text-center md:text-left">
            <h3 className="text-xl font-bold mb-4">
              TechnoWeb <span className="text-orange-500">Restaurant</span>
            </h3>
            <p className="text-gray-400 text-sm">
              © {new Date().getFullYear()} TechnoWeb Restaurant. Tous droits réservés.
            </p>
          </div>

          {/* Contact */}
          <div className="text-center md:text-left">
            <h4 className="text-lg font-semibold mb-4">Contact</h4>
            <a
              href="tel:+33753473804"
              className="text-gray-300 hover:text-orange-500 transition duration-200 block mb-2"
            >
              +33 7 53 47 38 04
            </a>
            <a
              href="mailto:contact@technowebrestaurant.fr"
              className="text-gray-300 hover:text-orange-500 transition duration-200 block"
            >
              contact@technowebrestaurant.fr
            </a>
          </div>

          {/* Adresse */}
          <div className="text-center md:text-left">
            <h4 className="text-lg font-semibold mb-4">Adresse</h4>
            <p className="text-gray-300">
              Sale galli, 60 foot road<br />
              Latur
            </p>
          </div>

          {/* Horaires */}
          <div className="text-center md:text-left">
            <h4 className="text-lg font-semibold mb-4">Horaires d'ouverture</h4>
            <p className="text-gray-300">
              Lundi - Dimanche<br />
              14h - 21h
            </p>
          </div>
        </div>

        {/* Lien vers le menu en bas */}
        <div className="mt-8 pt-8 border-t border-gray-700 text-center">
          <Link
            href="/menu"
            className="inline-block px-6 py-3 bg-orange-500 text-white font-medium rounded-xl hover:bg-orange-600 transition duration-200"
          >
            Découvrir notre menu complet →
          </Link>
        </div>
      </div>
    </footer>
  );
}

