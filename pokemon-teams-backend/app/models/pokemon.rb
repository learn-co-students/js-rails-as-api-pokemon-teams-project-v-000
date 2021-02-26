class Pokemon < ApplicationRecord
  belongs_to :trainer

  def self.create_new_pokemon(trainer_id)
    name = Faker::Name.first_name
    species = Faker::Games::Pokemon.name
    self.create(nickname: name, species: species, trainer_id: trainer_id)
  end

end
