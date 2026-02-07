import { Link } from "react-router-dom";
import { Activity, Phone, Mail, MapPin, Facebook, Twitter, Instagram, Youtube } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-sidebar text-sidebar-foreground">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-sidebar-primary text-sidebar-primary-foreground">
                <Activity className="h-6 w-6" />
              </div>
              <div>
                <p className="font-display font-bold">SMC Health</p>
                <p className="text-xs text-sidebar-foreground/70">Solapur Municipal Corporation</p>
              </div>
            </div>
            <p className="text-sm text-sidebar-foreground/70 leading-relaxed">
              Integrated Smart Public Health Management System for better healthcare accessibility and citizen engagement.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm text-sidebar-foreground/70">
              <li><Link to="/dashboard" className="hover:text-sidebar-primary transition-colors">Dashboard</Link></li>
              <li><Link to="/surveillance" className="hover:text-sidebar-primary transition-colors">Disease Surveillance</Link></li>
              <li><Link to="/hospitals" className="hover:text-sidebar-primary transition-colors">Hospital Status</Link></li>
              <li><Link to="/services" className="hover:text-sidebar-primary transition-colors">Citizen Services</Link></li>
              <li><Link to="/emergency" className="hover:text-sidebar-primary transition-colors">Emergency Services</Link></li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="font-semibold mb-4">Services</h3>
            <ul className="space-y-2 text-sm text-sidebar-foreground/70">
              <li><Link to="/services" className="hover:text-sidebar-primary transition-colors">Book Appointment</Link></li>
              <li><Link to="/services" className="hover:text-sidebar-primary transition-colors">Vaccination Schedule</Link></li>
              <li><Link to="/services" className="hover:text-sidebar-primary transition-colors">Telemedicine</Link></li>
              <li><Link to="/services" className="hover:text-sidebar-primary transition-colors">Health Records</Link></li>
              <li><Link to="/reports" className="hover:text-sidebar-primary transition-colors">Download Reports</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-semibold mb-4">Contact</h3>
            <ul className="space-y-3 text-sm text-sidebar-foreground/70">
              <li className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-sidebar-primary" />
                <span>Emergency: 108 | Helpline: 1800-XXX-XXXX</span>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-sidebar-primary" />
                <span>health@solapurmc.gov.in</span>
              </li>
              <li className="flex items-start gap-2">
                <MapPin className="h-4 w-4 text-sidebar-primary mt-0.5" />
                <span>SMC Health Office, Solapur, Maharashtra 413001</span>
              </li>
            </ul>
            
            {/* Social Links */}
            <div className="flex gap-3 mt-4">
              <a href="#" className="h-9 w-9 rounded-lg bg-sidebar-accent flex items-center justify-center hover:bg-sidebar-primary transition-colors">
                <Facebook className="h-4 w-4" />
              </a>
              <a href="#" className="h-9 w-9 rounded-lg bg-sidebar-accent flex items-center justify-center hover:bg-sidebar-primary transition-colors">
                <Twitter className="h-4 w-4" />
              </a>
              <a href="#" className="h-9 w-9 rounded-lg bg-sidebar-accent flex items-center justify-center hover:bg-sidebar-primary transition-colors">
                <Instagram className="h-4 w-4" />
              </a>
              <a href="#" className="h-9 w-9 rounded-lg bg-sidebar-accent flex items-center justify-center hover:bg-sidebar-primary transition-colors">
                <Youtube className="h-4 w-4" />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-6 border-t border-sidebar-border flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-sidebar-foreground/60">
          <p>© 2024 Solapur Municipal Corporation. All rights reserved.</p>
          <div className="flex gap-4">
            <Link to="#" className="hover:text-sidebar-primary transition-colors">Privacy Policy</Link>
            <Link to="#" className="hover:text-sidebar-primary transition-colors">Terms of Service</Link>
            <Link to="#" className="hover:text-sidebar-primary transition-colors">Accessibility</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
