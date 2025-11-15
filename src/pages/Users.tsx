import Button from "../components/Button"
import user from "../assets/images/user-icon.svg"
import { useEffect, useState } from "react";
import UsersTable from "../components/UserTable";
import ellipse from "../assets/images/ellipse.svg"
import UserModal from "../components/UserModal";
import { getUsers, createUser, updateUser, deleteUser, type User} from "../services/userService";
import { useToast } from "../utils/Toast";

function Users() {
  const [activeTab, setActiveTab] = useState<'users' | 'profile'>('users');
  const [usersList, setUsersList] = useState<User[]>([])
  const [modalState, setModalState] = useState<{
    isOpen: boolean;
    mode: 'add' | 'edit' | 'view';
    user?: any;
  }>({ isOpen: false, mode: 'add' });
  const [loading, setLoading] = useState(true);
  const {showToast} = useToast();

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const data = await getUsers();
      setUsersList(data);
    } catch (error) {
      console.error('Error fetching users:', error);
    } finally {
      setLoading(false);
    }
  };


  const handleAddUser = () => {
    setModalState({ isOpen: true, mode: 'add' });
  };

  const handleEditUser = (userId: string) => {
    const user = usersList.find(u => u.id === userId);
    setModalState({ isOpen: true, mode: 'edit', user });
  };

  const handleViewUser = (userId: string) => {
    const user = usersList.find(u => u.id === userId);
    setModalState({ isOpen: true, mode: 'view', user });
  };

  const handleDeleteUser = async(userId: string) => {
    try {
      await deleteUser(userId)
      await fetchUsers();
      showToast('User Deleted Successfully', 'success')
    } catch (error) {
      console.error('Error saving user:', error);
      showToast('Error Deleting user, Please try again later.', 'error')
    }
  }

  const handleSaveUser = async (user: User) => {
    try {
      if (modalState.mode === 'add') {
        await createUser(user);
      showToast('User Created Successfully', 'success')
      } else if (modalState.mode === 'edit') {
        await updateUser(user.id, user);
      showToast('User Updated Successfully', 'success')
      }
      await fetchUsers();
    } catch (error) {
      console.error('Error saving user:', error);
      showToast('Error Saving/Updating user, Please try again later.', 'error')
    }
  };

  return (
    <div className="relative bg-white h-screen w-full">
      <div className='w-full h-[56.5px] flex items-center justify-between border-b border-[#CAD2D8] px-6'>
        <div className="flex items-center gap-2 text-[#566676]">
          <img src={user} alt='user-icon' className="w-5 h-5" />
          <span>Users & Partners</span>
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-chevron-right-icon lucide-chevron-right w-3 h-3"><path d="m9 18 6-6-6-6"/></svg>
          <span className="capitalize">{activeTab}</span>
        </div>
        <Button
         variant="secondary"
         text="New" 
         icon={
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-plus-icon lucide-plus"><path d="M5 12h14"/><path d="M12 5v14"/></svg>
         }
         onClick={handleAddUser}
        />
      </div>
      <div className="flex items-center justify-between px-6 py-4">
        <h1 className="text-xl font-semibold text-[#15191E]">Users & Partners</h1>
        
        <div className="flex items-center gap-2">
          <button className="p-2 hover:bg-gray-100 rounded transition-colors cursor-pointer">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-funnel-icon lucide-funnel"><path d="M10 20a1 1 0 0 0 .553.895l2 1A1 1 0 0 0 14 21v-7a2 2 0 0 1 .517-1.341L21.74 4.67A1 1 0 0 0 21 3H3a1 1 0 0 0-.742 1.67l7.225 7.989A2 2 0 0 1 10 14z"/></svg>
          </button>
          <button className="p-2 hover:bg-gray-100 rounded transition-colors cursor-pointer">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-search-icon lucide-search"><path d="m21 21-4.34-4.34"/><circle cx="11" cy="11" r="8"/></svg>
          </button>
          <button className="flex items-center gap-1.5 px-3 py-2 hover:bg-gray-100 rounded transition-colors cursor-pointer">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-columns3-icon lucide-columns-3"><rect width="18" height="18" x="3" y="3" rx="2"/><path d="M9 3v18"/><path d="M15 3v18"/></svg>
            <span className="text-sm font-medium text-[#15191E]">Columns</span>
          </button>
        </div>
      </div>
      <div className="flex items-center px-6 border-b border-[#CAD2D8]">
        <button
          onClick={() => setActiveTab('users')}
          className={`pb-3 px-0 mr-8 text-sm font-medium transition-colors relative cursor-pointer ${
            activeTab === 'users'
              ? 'text-[#15191E]'
              : 'text-[#566676] hover:text-gray-700'
          }`}
        >
          Users
          {activeTab === 'users' && (
            <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gray-900"></div>
          )}
        </button>
        <button
          onClick={() => setActiveTab('profile')}
          className={`pb-3 px-0 text-sm font-medium transition-colors relative cursor-pointer ${
            activeTab === 'profile'
              ? 'text-[#15191E]'
              : 'text-[#566676] hover:text-gray-700'
          }`}
        >
          Profile
          {activeTab === 'profile' && (
            <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gray-900"></div>
          )}
        </button>
      </div>
      {(usersList && usersList.length > 0) ? (
        <UsersTable
          users={usersList}
          onEdit={(id) => handleEditUser(id)}
          onView={(id) => handleViewUser(id)}
          onDelete={(id) => handleDeleteUser(id)}
        />
      ) : (
        <div className="flex flex-col gap-1.5 items-center justify-center h-[calc(100%-158px)]">
          <img src={ellipse} alt='empty state' className="w-56 h-56"/>
          <p className="font-bold text-[#15191E] text-lg">Create a new user</p>
          <p className="text-sm text-[#15191E] text-center max-w-md leading-relaxed mb-6">
            Add user details, set permissions, and assign roles to manage access<br />within your system.
          </p>
          <Button 
           text="New User" 
           icon={
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-plus-icon lucide-plus"><path d="M5 12h14"/><path d="M12 5v14"/></svg>
           }
           className="mt-8"
           onClick={handleAddUser}
           />
        </div>
      ) }

      <UserModal
        isOpen={modalState.isOpen}
        onClose={() => setModalState({ ...modalState, isOpen: false })}
        mode={modalState.mode}
        user={modalState.user}
        onSave={handleSaveUser}
        onAdd={handleAddUser}
        onEdit={handleEditUser}
      />
    </div>
  )
}

export default Users