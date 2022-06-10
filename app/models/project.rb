class Project < ApplicationRecord
    has_many :rfis
    has_many :users, through: :enrollments
end
