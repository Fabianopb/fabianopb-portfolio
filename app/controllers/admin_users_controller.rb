class AdminUsersController < ApplicationController
  
  layout 'admin'
  
  before_action :confirm_logged_in
  
  def edit
    @admin_user = AdminUser.find(params[:id])
  end
  
  def update
    @admin_user = AdminUser.find(params[:id])
    if @admin_user.update_attributes(admin_user_params)
      redirect_to(:controller => 'access', :action => 'index')
    else
      render('edit')
    end
  end
  
  private
  
  def admin_user_params
    params.require(:admin_user).permit(:name, :username, :password)
  end
  
end
