require 'faker'
require 'securerandom'

Pokemon.delete_all
Trainer.delete_all


trainers_name = [
  'Natalie',
  'Prince',
  'Dick',
  'Rachel',
  'Garry',
  'Jason',
  'Matt',
  'Niky',
  'Ashley'
]

trainer_collection = []

trainers_name.each do |name|
  trainer_collection << Trainer.create(name: name)
end

trainer_collection.each do |trainer|
  team_size = (SecureRandom.random_number(6) + 1).floor

  (1..team_size).each do |poke|
    name = Faker::Name.first_name
    species = Faker::Games::Pokemon.name
    Pokemon.create(nickname: name, species: species, trainer_id: trainer.id)
  end
end

# 50.times do
#   Pokemon.create(nickname: Faker::Name.first_name, species: Faker::Games::Pokemon.name)
# end
