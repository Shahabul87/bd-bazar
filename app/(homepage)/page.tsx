import { Categories } from "../(protected)/search/_components/categories";
import { CourseCardHome } from "@/components/course-card-home";
import { Header } from "./header";
import { HeaderAfterLogin } from "./header-after-login";
import { currentUser } from '@/lib/auth';
import { MainFooter } from "./main-footer";

const Home = async () => {
  const user = await currentUser();

  return (
    <>
      {/* Header Section */}
      {!user ? <Header /> : <HeaderAfterLogin />}

      {/* Main Content */}
      <main className="min-h-screen">
        {/* Categories Section */}
        <section className="py-12">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl font-bold text-center mb-8 text-gray-100">
              Course Categories
            </h2>
            <Categories items={[]} />
          </div>
        </section>

        {/* Courses Section */}
        <section className="py-12 bg-gray-900/50">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl font-bold text-center mb-8 text-gray-100">
              Featured Courses
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              <p className="text-center col-span-full text-gray-400">
                No courses found
              </p>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <MainFooter />
    </>
  );
};

export default Home;