import style from './Contact.module.css';

const Contact = () => {
  return (
    <div>
      <section className={style.Section}>
        <h4>My contacts</h4>
        <div className={style.SortForm}>react.developer@test.com</div>
      </section>
    </div>
  );
};

export default Contact;
