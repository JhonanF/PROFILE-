import { profile } from "../../data/profile";

export function HolographicAvatar() {
  return (
    <div className="premium-portrait">
      <figure className="premium-portrait__frame">
        <div className="premium-portrait__media">
          <picture>
            <source srcSet="/jhonan-profile-320.webp" type="image/webp" />
            <img
              src="/jhonan-profile.png"
              alt="Portrait of Jhonan Factor"
              width={320}
              height={320}
              decoding="async"
              fetchPriority="high"
            />
          </picture>

          <div className="premium-portrait__shade" aria-hidden="true" />

          <div className="premium-portrait__topline" aria-hidden="true">
            <span>JF<span>_</span></span>
            <i />
          </div>

          <figcaption className="premium-portrait__caption">
            <span className="premium-portrait__pin" aria-hidden="true" />
            {profile.location}
          </figcaption>
        </div>
      </figure>
    </div>
  );
}
