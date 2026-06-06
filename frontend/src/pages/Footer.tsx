import {
  MessageCircle,
} from "lucide-react";

import style from "../styles/footer.module.css";

export function Footer() {
  return (
    <footer className={style.footer}>
      {/* Glow */}
      <div className={`${style.footerGlow} ${style.footerGlowLeft}`}></div>
      <div className={`${style.footerGlow} ${style.footerGlowRight}`}></div>

      <div className={style.footerContainer}>
        {/* Grid */}
        <div className={style.footerGrid}>
          {/* Brand */}
          <div className={style.footerBrand}>
            <div className={style.footerLogo}>
              <div className={style.footerLogoIcon}>
                <MessageCircle size={22} />
              </div>

              <h3>Chatbot AI</h3>
            </div>

            <p>
              Plataforma moderna para criação de experiências conversacionais
              inteligentes utilizando inteligência artificial.
            </p>

            <div className={style.footerSocials}>
              {/* <a href="#">
                <Github size={18} />
              </a> */}

            </div>
          </div>

          {/* Product */}
          <div>
            <h4>Product</h4>

            <ul>
              <li><a href="#">Features</a></li>
              <li><a href="#">Integrations</a></li>
              <li><a href="#">Pricing</a></li>
              <li><a href="#">API</a></li>
              <li><a href="#">Changelog</a></li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4>Resources</h4>

            <ul>
              <li><a href="#">Documentation</a></li>
              <li><a href="#">Help Center</a></li>
              <li><a href="#">Community</a></li>
              <li><a href="#">Blog</a></li>
              <li><a href="#">Status</a></li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4>Company</h4>

            <ul>
              <li><a href="#">About</a></li>
              <li><a href="#">Careers</a></li>
              <li><a href="#">Privacy Policy</a></li>
              <li><a href="#">Terms of Service</a></li>
              <li><a href="#">Contact</a></li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className={style.footerBottom}>
          <p>© 2026 Chatbot AI. All rights reserved.</p>

          <p>Built for modern AI experiences.</p>
        </div>
      </div>
    </footer>
  );
}