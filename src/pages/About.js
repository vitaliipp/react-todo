import style from './About.module.css';

const About = () => {
  return (
    <div>
      <section className={style.Section}>
        <h4>about my app</h4>
        <div className={style.SortForm}>
          <ul>
            My Todo App is a clean and intuitive web application designed to
            help users keep track of their tasks, priorities, and deadlines. It
            leverages the power of React.js to provide a responsive and dynamic
            user interface for managing to-do lists effectively. Here are some
            key features and components of this application:
            <li style={{ marginTop: '1rem' }}>
              <b>Task List:</b> The main interface of the app displays a list of
              tasks or to-do items. Each item typically includes a task title,
              description, and optional due date. Users can easily scan through
              their tasks and check off completed items.
            </li>
            <li>
              <b>Task Creation:</b> Users can add new tasks to their list using
              a simple input form. They can provide a task titles. This feature
              allows for quick and easy task entry.
            </li>
            <li>
              <b>Task Deletion:</b> Users can delete tasks they no longer need
              or want to track. This action is typically accompanied by a
              confirmation prompt to prevent accidental deletions.
            </li>
            <li>
              <b>Responsive Design:</b> Todo App are designed to be responsive,
              meaning they adapt to different screen sizes and devices. Whether
              you're using a desktop computer, tablet, or smartphone, the app
              remains user-friendly.
            </li>
          </ul>
        </div>
      </section>
    </div>
  );
};

export default About;
