import Link from 'next/link';
import { ArrowLeft, Users, Target, Lightbulb, Globe } from 'lucide-react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';

export default function About() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-slate-950 to-black relative overflow-hidden">
      {/* Animated Background Orbs with Red-Blue Gradient */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-red-600/10 rounded-full blur-3xl animate-float"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl animate-float delay-200"></div>
        
        {/* Gradient Lines */}
        <div className="absolute inset-0">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-red-600/20 to-transparent"></div>
          <div className="absolute top-0 right-0 w-full h-1 bg-gradient-to-l from-transparent via-blue-600/20 to-transparent"></div>
        </div>
      </div>

      {/* Navigation */}
      <Navigation />

      {/* Back Button */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 md:px-6 py-6">
        <Link href="/" className="inline-flex items-center gap-2 text-blue-400 hover:text-blue-300 transition-colors animate-fade-in">
          <ArrowLeft className="w-4 h-4" />
          Retour à l'accueil
        </Link>
      </div>

      <main className="relative z-10 max-w-4xl mx-auto px-4 md:px-6 pb-20">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold text-white mb-6">À Propos du Projet</h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore.
          </p>
        </div>

        {/* Origin Story */}
        <section className="mb-16">
          <div className="bg-gradient-to-br from-blue-500/10 to-slate-800/50 rounded-2xl border border-blue-400/20 p-8">
            <h2 className="text-3xl font-bold text-white mb-6 flex items-center gap-3">
              <Users className="w-8 h-8 text-red-500" />
              Notre Origine
            </h2>
            <div className="prose prose-invert text-gray-300">
              <p className="mb-4">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed non risus suspendisse lectus tortor, 
                dignissim sit amet, adipiscing nec, ultricies sed, dolor. Cras elementum ultrices diam. Maecenas 
                ligula massa, varius a, semper congue, euismod non, mi.
              </p>
              <p>
                Proin porttitor, orci nec nonummy molestie, enim est eleifend mi, non fermentum diam nisl sit amet 
                erat. Duis semper. Duis arcu massa, scelerisque vitae, consequat in, pretium a, enim. Pellentesque 
                congue ut massa tempor quis, eros pede lorem nulla.
              </p>
            </div>
          </div>
        </section>

        {/* Mission */}
        <section className="mb-16">
          <div className="bg-gradient-to-br from-red-500/10 to-slate-800/50 rounded-2xl border border-red-400/20 p-8">
            <h2 className="text-3xl font-bold text-white mb-6 flex items-center gap-3">
              <Target className="w-8 h-8 text-blue-400" />
              Notre Mission
            </h2>
            <div className="prose prose-invert text-gray-300">
              <p className="mb-4">
                Ut convallis libero in urna ultrices accumsan. Donec sed odio dui. Sed posuere consectetur est at 
                lobortis. Aenean lacinia bibendum nulla sed consectetur curabitur blandit tempus porttitor.
              </p>
              <p>
                Vivamus sagittis lacus vel augue laoreet rutrum faucibus dolor auctor. Integer posuere erat a ante 
                venenatis dapibus posuere velit aliquet. Cras mattis consectetur purus sit amet fermentum.
              </p>
            </div>
          </div>
        </section>

        {/* Objectives */}
        <section className="mb-16">
          <div className="bg-gradient-to-br from-blue-500/10 to-slate-800/50 rounded-2xl border border-blue-400/20 p-8">
            <h2 className="text-3xl font-bold text-white mb-8 flex items-center gap-3">
              <Lightbulb className="w-8 h-8 text-yellow-400" />
              Nos Objectifs
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="bg-red-500/20 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 border border-red-400/30">
                  <Lightbulb className="w-8 h-8 text-red-400" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-3">Inspirer</h3>
                <p className="text-gray-400">
                  Lorem ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod tempor.
                </p>
              </div>
              <div className="text-center">
                <div className="bg-blue-500/20 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 border border-blue-400/30">
                  <Globe className="w-8 h-8 text-blue-400" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-3">Connecter</h3>
                <p className="text-gray-400">
                  Ut enim ad minim veniam quis nostrud exercitation ullamco laboris nisi ut aliquip.
                </p>
              </div>
              <div className="text-center">
                <div className="bg-purple-500/20 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 border border-purple-400/30">
                  <Users className="w-8 h-8 text-purple-400" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-3">Collaborer</h3>
                <p className="text-gray-400">
                  Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Project Creation Story */}
        <section className="mb-16">
          <div className="bg-gradient-to-br from-slate-700/30 to-slate-800/50 rounded-2xl border border-slate-600/30 p-8">
            <h2 className="text-3xl font-bold text-white mb-6">Notre Histoire</h2>
            <div className="prose prose-invert text-gray-300">
              <p className="mb-4">
                Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. 
                Vestibulum tortor quam, feugiat vitae, ultricies eget, tempor sit amet, ante.
              </p>
              <p className="mb-4">
                Donec eu libero sit amet quam egestas semper. Aenean ultricies mi vitae est. Mauris placerat 
                eleifend leo. Quisque sit amet est et sapien ullamcorper pharetra.
              </p>
              <p>
                Vestibulum erat wisi, condimentum sed, commodo vitae, ornare sit amet, wisi. Aenean fermentum, 
                elit eget tincidunt condimentum, eros ipsum rutrum orci, sagittis tempus lacus enim ac dui.
              </p>
            </div>
          </div>
        </section>

        {/* TEDx License */}
        <section className="mb-16">
          <div className="bg-gradient-to-r from-red-500/10 to-blue-500/10 rounded-2xl p-8 text-center border border-white/10">
            <h2 className="text-2xl font-bold text-white mb-4">Licence TEDx</h2>
            <p className="text-gray-300">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed non risus suspendisse lectus tortor, 
              dignissim sit amet, adipiscing nec, ultricies sed, dolor magna aliqua.
            </p>
          </div>
        </section>

        {/* CTA */}
        <div className="text-center">
          <Link 
            href="/contact"
            className="inline-flex items-center gap-2 bg-gradient-to-r from-red-600 to-red-500 text-white px-8 py-4 rounded-full font-semibold text-lg hover:from-red-700 hover:to-red-600 transition-all shadow-lg shadow-red-500/30"
          >
            Rejoignez Notre Mission
            <ArrowLeft className="w-5 h-5 rotate-180" />
          </Link>
        </div>
      </main>

      <Footer />
    </div>
  );
}