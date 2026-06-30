import MaskLines from "./MaskLines";
import MarqueeLink from "./MarqueeLink";

/** Big editorial closing CTA. */
export default function EditorialContact() {
  return (
    <section className="ed-contact" id="contact">
      <div className="ed-wrap">
        <h2 className="preserve-case">
          <MaskLines
            className="ed-mask"
            lines={[
              "Have something worth",
              <em key="em">building well?</em>,
            ]}
          />
        </h2>
        <MarqueeLink
          href="mailto:karim.ah.khalifeh@gmail.com"
          label="karim.ah.khalifeh@gmail.com"
          className="ed-contact-mail preserve-case"
        />
      </div>
    </section>
  );
}
