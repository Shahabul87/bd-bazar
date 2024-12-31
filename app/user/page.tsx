import { currentUser } from "@/lib/auth";
import { db } from "@/lib/db";
import { redirect } from "next/navigation";

const User = async () => {
  const user = await currentUser();

  // Redirect if no user is found
  if (!user?.id) {
    redirect("/auth/login");
  }

  try {
    const userData = await db.user.findUnique({
      where: { 
        id: user.id 
      },
      include: {
        accounts: true,
        purchases: {
          include: {
            course: true
          }
        }
      }
    });

    if (!userData) {
      return (
        <div className="p-6">
          <p className="text-center text-gray-500">User data not found</p>
        </div>
      );
    }

    return (
      <div className="p-6">
        {/* User data display */}
        <div className="max-w-4xl mx-auto space-y-6">
          <h1 className="text-2xl font-bold">User Profile</h1>
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
            <div className="space-y-4">
              <div>
                <h2 className="text-lg font-semibold">Account Information</h2>
                <p>Name: {userData.name}</p>
                <p>Email: {userData.email}</p>
              </div>
              
              <div>
                <h2 className="text-lg font-semibold">Purchased Courses</h2>
                {userData.purchases.length > 0 ? (
                  <ul className="space-y-2">
                    {userData.purchases.map((purchase) => (
                      <li key={purchase.id}>
                        {purchase.course.title}
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-gray-500">No courses purchased yet</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    );

  } catch (error) {
    console.error("Error fetching user data:", error);
    return (
      <div className="p-6">
        <p className="text-center text-red-500">
          Something went wrong while fetching user data
        </p>
      </div>
    );
  }
};

export default User;