class ProjectSerializer < ActiveModel::Serializer
  attributes :title, :location, :id
  has_many :rfis

end
