class UsersController < ApplicationController
    rescue_from ActiveRecord::RecordInvalid, with: :invalid_record

    def index
        users = User.all
        render json: users
    end

    def show 
        user = User.find_by(id: session[:user_id])
        if user
            render json: user
        else 
            render json: { error: "Not authorized"}, status: :unauthorized
        end
    end

 

    def find_project 
        project = Project.find_by(title: params[:search])
        render json: project
    end

    def create 
        user = User.create(user_params)
        if user.valid? 
            session[:user_id] = user.id
            render json: user, status: :created
        else
            render json: { errors: user.errors.full_messages }, status: :unprocessable_entity
        end
    end

    private

    def user_params
        params.permit(:email, :password, :password_confirmation, :first_name, :organization, :role)
    end

    def invalid_record(invalid)
        render json: {errors: invalid.record.errors.full_messages}, status: :unprocessable_entity
    end

end
 