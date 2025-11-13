import Header from "../../../component/Header";
import Footer from "../../../component/Footer";

export default function OrderPage() {
  return (
    <div className="bg-gray-50 min-h-screen">

      <main className="pt-32 pb-16 px-4">
        <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* COLONNE FORMULAIRE */}
          <div className="lg:col-span-2 bg-white shadow-md rounded-2xl p-8">
            <p className="text-xs uppercase tracking-widest text-gray-400 mb-2">
              Commande en ligne
            </p>
            <h1 className="text-3xl font-bold mb-2 text-gray-800">
              Passez votre commande
            </h1>
            <p className="text-gray-600 mb-8">
              Indiquez vos informations et les plats souhaités. Nous vous
              recontacterons pour confirmer votre commande.
            </p>

            <form className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Nom complet
                </label>
                <input
                  type="text"
                  required
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring focus:ring-yellow-300 focus:outline-none"
                  placeholder="Votre nom"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Téléphone
                </label>
                <input
                  type="tel"
                  required
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring focus:ring-yellow-300 focus:outline-none"
                  placeholder="ex : 07 12 34 56 78"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Date
                  </label>
                  <input
                    type="date"
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring focus:ring-yellow-300 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Heure
                  </label>
                  <input
                    type="time"
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring focus:ring-yellow-300 focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Votre commande
                </label>
                <textarea
                  required
                  rows={4}
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring focus:ring-yellow-300 focus:outline-none resize-none"
                  placeholder="Ex : 2 burgers, 1 pizza, 3 boissons..."
                />
              </div>

              <button
                type="button"
                className="w-full bg-[#491904] hover:bg-[#c09858] text-white font-semibold py-3 rounded-full transition"
              >
                Envoyer la commande
              </button>
            </form>

            {/* BOUTONS SECONDAIRES */}
            <div className="mt-6 flex flex-wrap gap-4 justify-center">
              <a
                href="/menu"
                className="px-6 py-2 rounded-full border border-[#491904] text-[#491904] text-sm font-medium hover:bg-[#491904] hover:text-white transition"
              >
                Voir le menu
              </a>
              <a
                href="/"
                className="px-6 py-2 rounded-full border border-gray-300 text-gray-600 text-sm font-medium hover:bg-gray-100 transition"
              >
                Retour à l’accueil
              </a>
            </div>
          </div>

          {/* COLONNE INFO / DESIGN */}
          <aside className="bg-[#491904] text-white rounded-2xl p-6 flex flex-col justify-between">
            <div>
              <h2 className="text-xl font-semibold mb-4">Infos utiles</h2>
              <p className="text-sm text-white/80 mb-4">
                Vous pouvez commander vos plats à l’avance pour emporter
                ou pour une réservation sur place.
              </p>
              <ul className="space-y-2 text-sm text-white/90">
                <li>
                  <span className="font-semibold">Téléphone :</span>{" "}
                  +33 7 53 47 38 04
                </li>
                <li>
                  <span className="font-semibold">Horaires :</span>{" "}
                  Lundi - Dimanche : 14h - 21h
                </li>
                <li>
                  <span className="font-semibold">Adresse :</span>{" "}
                  Sale galli, 60 foot road, Latur
                </li>
              </ul>
            </div>

            <div className="mt-8 text-sm text-white/60">
              <p>
                En envoyant votre commande, vous acceptez que nous vous
                contactions par téléphone pour la confirmer.
              </p>
            </div>
          </aside>
        </div>
      </main>

      <Footer />
    </div>
  );
}
