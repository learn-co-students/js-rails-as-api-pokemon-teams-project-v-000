class Pokemon < ApplicationRecord
  belongs_to :trainer
  validates_associated :trainer
end
