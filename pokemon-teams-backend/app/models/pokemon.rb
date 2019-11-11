class Pokemon < ApplicationRecord
  def self.create_random(trainer_id)
    nickname = Faker::Name.first_name
    species = Faker::Games::Pokemon.name
    self.create(nickname: nickname, species: species, trainer_id: trainer_id)
  end

  belongs_to :trainer
end
