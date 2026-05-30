import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Loader2, CheckCircle, AlertCircle, Send, Mail, User, MessageSquare } from 'lucide-react';

const contactSchema = z.object({
  name: z.string().min(2, 'El nombre es requerido (mínimo 2 caracteres)'),
  email: z.string().email('Ingresa un email válido'),
  subject: z.string().min(3, 'El asunto es requerido (mínimo 3 caracteres)'),
  message: z.string().min(10, 'El mensaje debe tener al menos 10 caracteres'),
});

type ContactFormData = z.infer<typeof contactSchema>;

const FORMSPREE_ENDPOINT = `https://formspree.io/f/${import.meta.env.VITE_FORMSPREE_ID || 'YOUR_FORM_ID'}`;

export function ContactForm() {
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
  });

  const onSubmit = async (data: ContactFormData) => {
    setStatus('submitting');
    try {
      const response = await fetch(FORMSPREE_ENDPOINT, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        setStatus('success');
        reset();
      } else {
        setStatus('error');
      }
    } catch {
      setStatus('error');
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="name" className="flex items-center gap-2 font-label text-taza-dark">
          <User size={14} /> Nombre
        </Label>
        <Input
          id="name"
          {...register('name')}
          className="border-taza-border bg-white/50 focus:border-taza-brown focus:ring-taza-brown text-taza-dark font-body"
          placeholder="Tu nombre completo"
        />
        {errors.name && (
          <p className="text-sm text-red-500 flex items-center gap-1 font-body">
            <AlertCircle size={14} /> {errors.name.message}
          </p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="email" className="flex items-center gap-2 font-label text-taza-dark">
          <Mail size={14} /> Email
        </Label>
        <Input
          id="email"
          type="email"
          {...register('email')}
          className="border-taza-border bg-white/50 focus:border-taza-brown focus:ring-taza-brown text-taza-dark font-body"
          placeholder="tu@email.com"
        />
        {errors.email && (
          <p className="text-sm text-red-500 flex items-center gap-1 font-body">
            <AlertCircle size={14} /> {errors.email.message}
          </p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="subject" className="flex items-center gap-2 font-label text-taza-dark">
          <MessageSquare size={14} /> Asunto
        </Label>
        <Input
          id="subject"
          {...register('subject')}
          className="border-taza-border bg-white/50 focus:border-taza-brown focus:ring-taza-brown text-taza-dark font-body"
          placeholder="¿De qué se trata?"
        />
        {errors.subject && (
          <p className="text-sm text-red-500 flex items-center gap-1 font-body">
            <AlertCircle size={14} /> {errors.subject.message}
          </p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="message" className="flex items-center gap-2 font-label text-taza-dark">
          <MessageSquare size={14} /> Mensaje
        </Label>
        <Textarea
          id="message"
          rows={5}
          {...register('message')}
          className="border-taza-border bg-white/50 focus:border-taza-brown focus:ring-taza-brown text-taza-dark font-body resize-none"
          placeholder="Cuéntanos en qué podemos ayudarte..."
        />
        {errors.message && (
          <p className="text-sm text-red-500 flex items-center gap-1 font-body">
            <AlertCircle size={14} /> {errors.message.message}
          </p>
        )}
      </div>

      <Button
        type="submit"
        disabled={status === 'submitting'}
        className="w-full bg-taza-brown hover:bg-taza-brown-dark text-taza-cream font-label transition-all duration-300"
      >
        {status === 'submitting' ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Enviando...
          </>
        ) : (
          <>
            <Send className="mr-2 h-4 w-4" />
            Enviar mensaje
          </>
        )}
      </Button>

      {status === 'success' && (
        <div className="flex items-center gap-2 text-taza-turquoise bg-taza-turquoise/10 p-4 rounded-lg animate-fade-in">
          <CheckCircle size={20} />
          <span className="font-body">¡Mensaje enviado con éxito! Te responderemos pronto. ☕</span>
        </div>
      )}

      {status === 'error' && (
        <div className="flex items-center gap-2 text-red-600 bg-red-50 p-4 rounded-lg animate-fade-in">
          <AlertCircle size={20} />
          <div className="font-body">
            <p className="font-medium">Hubo un error al enviar.</p>
            <p className="text-sm">Intenta de nuevo o escríbenos directamente a <a href="mailto:info@latazanomada.com" className="underline">info@latazanomada.com</a></p>
          </div>
        </div>
      )}
    </form>
  );
}