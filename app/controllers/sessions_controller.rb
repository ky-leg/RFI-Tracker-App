class SessionsController < ApplicationController
    def create 
        user = User.find_by(email: params[:email])
        if user&.authenticate(params[:password])
            session[:user_id] = user.id
            render json: user
        else
            render json: {errors: ["Not authorized"]}, status: :unauthorized
        end
    end
    
end
