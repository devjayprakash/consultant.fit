import { trpcServer } from '../api/_trpc';
import ProjectsPage from './ProjectsLists';

const Projects = async () => {
  const projects = await trpcServer().project.getProjects();
  return <ProjectsPage initialData={projects} />;
};

export default Projects;
