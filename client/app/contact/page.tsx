'use client';

import { useState } from 'react';
import { Mail, Phone, MapPin, Send, MessageCircle } from 'lucide-react';

export default function Contact() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: ''
    });
    const [sent, setSent] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setSent(true);
        setTimeout(() => {
            setSent(false);
            setFormData({ name: '', email: '', message: '' });
        }, 3000);
    };

    return (
        <div className="min-h-screen bg-black text-white p-6 md:p-12">
            <div className="max-w-6xl mx-auto">
                <div className="text-center mb-16">
                    <h1 className="text-4xl md:text-6xl font-bold mb-4">Get in Touch</h1>
                    <p className="text-gray-400 text-lg">Have questions? Our expert team is here to help.</p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                    {/* Contact Info */}
                    <div className="space-y-8">
                        <div className="bg-zinc-900 p-8 rounded-3xl border border-gray-800">
                            <h3 className="text-2xl font-bold mb-6 flex items-center gap-3">
                                <MessageCircle className="text-blue-500" /> Expert Chat
                            </h3>
                            <p className="text-gray-400 mb-6">
                                Need immediate assistance with your workout or diet plan? Chat with our AI coach or request a human expert.
                            </p>
                            <button className="w-full py-4 bg-blue-600 hover:bg-blue-700 rounded-xl font-bold transition-colors flex items-center justify-center gap-2">
                                <MessageCircle size={20} /> Start Live Chat
                            </button>
                        </div>

                        <div className="bg-zinc-900 p-8 rounded-3xl border border-gray-800 space-y-6">
                            <div className="flex items-start gap-4">
                                <div className="bg-gray-800 p-3 rounded-lg text-gray-400">
                                    <Mail size={24} />
                                </div>
                                <div>
                                    <h4 className="font-bold text-lg">Email Us</h4>
                                    <p className="text-gray-400">support@fitai.com</p>
                                    <p className="text-gray-400">partnerships@fitai.com</p>
                                </div>
                            </div>

                            <div className="flex items-start gap-4">
                                <div className="bg-gray-800 p-3 rounded-lg text-gray-400">
                                    <Phone size={24} />
                                </div>
                                <div>
                                    <h4 className="font-bold text-lg">Call Us</h4>
                                    <p className="text-gray-400">+1 (555) 123-4567</p>
                                    <p className="text-sm text-gray-500">Mon-Fri, 9am - 6pm EST</p>
                                </div>
                            </div>

                            <div className="flex items-start gap-4">
                                <div className="bg-gray-800 p-3 rounded-lg text-gray-400">
                                    <MapPin size={24} />
                                </div>
                                <div>
                                    <h4 className="font-bold text-lg">Visit HQ</h4>
                                    <p className="text-gray-400">123 Fitness Blvd, Tech City</p>
                                    <p className="text-gray-400">San Francisco, CA 94107</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Contact Form */}
                    <div className="bg-zinc-900 p-8 rounded-3xl border border-gray-800">
                        <h3 className="text-2xl font-bold mb-6">Send a Message</h3>
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div>
                                <label className="block text-gray-400 text-sm mb-2">Name</label>
                                <input
                                    type="text"
                                    value={formData.name}
                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                    className="w-full bg-black border border-gray-800 rounded-lg px-4 py-3 focus:border-blue-500 outline-none transition-colors"
                                    placeholder="John Doe"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-gray-400 text-sm mb-2">Email</label>
                                <input
                                    type="email"
                                    value={formData.email}
                                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                    className="w-full bg-black border border-gray-800 rounded-lg px-4 py-3 focus:border-blue-500 outline-none transition-colors"
                                    placeholder="john@example.com"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-gray-400 text-sm mb-2">Message</label>
                                <textarea
                                    value={formData.message}
                                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                                    className="w-full bg-black border border-gray-800 rounded-lg px-4 py-3 focus:border-blue-500 outline-none transition-colors h-32 resize-none"
                                    placeholder="How can we help you?"
                                    required
                                />
                            </div>
                            <button
                                type="submit"
                                disabled={sent}
                                className={`w-full py-4 rounded-xl font-bold transition-all flex items-center justify-center gap-2 ${sent ? 'bg-green-500 text-black' : 'bg-white text-black hover:bg-gray-200'
                                    }`}
                            >
                                {sent ? (
                                    <>Message Sent!</>
                                ) : (
                                    <>
                                        Send Message <Send size={18} />
                                    </>
                                )}
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}
