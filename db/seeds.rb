# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

eng = User.create(
    email: "kyle@stonefield.com",
    first_name: "Kyle",
    password_digest: User.digest('foobar'),
    organization: "Stonefield",
    role: "Civil Engineer"
)



arch = User.create(
    email: "hernan@TPG.com",
    first_name: "Hernan",
    password_digest: User.digest('foobar'),
    organization: "TPG",
    role: "Architect"
)



con = User.create(
    email: "Jon@TPG.com",
    first_name: "Jon",
    password_digest: User.digest('foobar'),
    organization: "DoRiteCon",
    role: "Superintendent"
)


project1 = Project.create(
    title: "Bank Ground-Up",
    location: "Red Hook"
)

project2 = Project.create(
    title: "School Renovation",
    location: "Sheepshead Bay"
)

project3 = Project.create(
    title: "Fast Food Ground-Up",
    location: "Williamsburg"
)

