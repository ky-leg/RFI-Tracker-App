class RfiSerializer < ActiveModel::Serializer
  attributes :id, :project_id, :user_id, :title, :body, :level, :status, :user_name
  belongs_to :user

  def user_name
    object.user.first_name
  end

end
