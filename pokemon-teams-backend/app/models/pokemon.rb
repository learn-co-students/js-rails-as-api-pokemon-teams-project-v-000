class Pokemon < ApplicationRecord
  belongs_to :trainer

  validate do
    pokemon_count_valid?
  end

  private

  def pokemon_count_valid?
    if self.trainer.pokemons.count >= 6
      self.errors.add(:team_max, "max pokemon is 6, can't add more")
    end
  end
end
